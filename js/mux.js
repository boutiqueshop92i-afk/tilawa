/* Tilawa — petit multiplexeur MP4 / MOV écrit pour l'appli.
   Vidéo H.264 (sortie de VideoEncoder) + son AAC (sortie d'AudioEncoder) dans un .mp4,
   ou vidéo H.264 + son PCM 16 bits non compressé dans un .mov (QuickTime) :
   ce second format ne demande aucun encodeur audio, il marche donc partout, iPhone compris. */
(function(global){
  'use strict';
  const te = new TextEncoder();
  const u8 = n => new Uint8Array([n & 255]);
  const u16 = n => new Uint8Array([(n >>> 8) & 255, n & 255]);
  const u24 = n => new Uint8Array([(n >>> 16) & 255, (n >>> 8) & 255, n & 255]);
  const u32 = n => new Uint8Array([(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]);
  const i32 = n => u32(n >>> 0);
  const str = s => te.encode(s);
  const zeros = n => new Uint8Array(n);
  function cat(parts){
    let n = 0; for(const p of parts) n += p.length;
    const out = new Uint8Array(n); let o = 0;
    for(const p of parts){ out.set(p, o); o += p.length; }
    return out;
  }
  function box(type, ...parts){ const body = cat(parts.flat()); return cat([u32(body.length + 8), str(type), body]); }
  function full(type, version, flags, ...parts){ return box(type, u8(version), u24(flags), ...parts); }
  const MATRIX = cat([u32(0x00010000), u32(0), u32(0), u32(0), u32(0x00010000), u32(0), u32(0), u32(0), u32(0x40000000)]);

  class Muxer {
    /* opts: {width, height, fps, mov:boolean, audio: null | {codec:'aac'|'lpcm', sampleRate, channels}} */
    constructor(opts){
      this.o = Object.assign({fps:30, mov:false, audio:null}, opts);
      this.vts = this.o.fps * 1000;            // échelle de temps vidéo
      this.v = [];                               // {data, key, pts}
      this.avcC = null;
      this.a = [];                               // AAC : {data}
      this.asc = null;
      this.pcm = null;                           // Int16Array entrelacé
    }
    setVideoConfig(desc){ if(desc && !this.avcC) this.avcC = toU8(desc); }
    addVideo(data, key, ptsUs){ this.v.push({data: toU8(data), key: !!key, pts: Math.round(ptsUs * this.vts / 1e6)}); }
    setAudioConfig(desc){ if(desc && desc.byteLength && !this.asc) this.asc = toU8(desc); }
    addAudio(data){ this.a.push({data: toU8(data)}); }
    setPCM(int16){ this.pcm = int16; }

    finalize(){
      const o = this.o, mov = !!o.mov, au = o.audio;
      if(!this.v.length) throw new Error('aucune image vidéo');
      if(!this.avcC) throw new Error('configuration H.264 absente');
      const fdur = 1000, nV = this.v.length;
      // Ordre de décodage = ordre d'arrivée. Décalages de composition si l'encodeur réordonne les images.
      const dts = this.v.map((_, i) => i * fdur);
      let minOff = 0; const offs = this.v.map((s, i) => { const d = s.pts - this.v[0].pts - dts[i]; if(d < minOff) minOff = d; return d; });
      const shift = -minOff, ctts = offs.map(d => d + shift), needCtts = ctts.some(x => x !== 0);
      const vDurTs = nV * fdur, vDurSec = vDurTs / this.vts;

      // Son
      let aSamples = 0, aDurTs = 0, aDurSec = 0, sr = 0, ch = 0;
      if(au){
        sr = au.sampleRate; ch = au.channels;
        if(au.codec === 'lpcm'){ if(!this.pcm) throw new Error('PCM absent'); aSamples = this.pcm.length / ch; aDurTs = aSamples; }
        else { aSamples = this.a.length; aDurTs = aSamples * 1024; if(!this.asc) this.asc = makeASC(sr, ch); }
        aDurSec = aDurTs / sr;
      }
      const hasAudio = !!au && aSamples > 0;

      // Morceaux entrelacés d'une seconde
      const chunks = [];   // {track:'v'|'a', first, count, bytes:[Uint8Array]}
      const vChunks = [], aChunks = [];
      let vi = 0, ai = 0, sec = 0;
      const total = Math.max(vDurSec, hasAudio ? aDurSec : 0);
      while(vi < nV || (hasAudio && ai < aSamples)){
        const tEnd = (sec + 1);
        const vStart = vi; while(vi < nV && dts[vi] / this.vts < tEnd) vi++;
        if(vi > vStart){ const c = {track:'v', first:vStart, count:vi - vStart, parts:this.v.slice(vStart, vi).map(s => s.data)}; chunks.push(c); vChunks.push(c); }
        if(hasAudio){
          const aStart = ai;
          if(au.codec === 'lpcm'){ ai = Math.min(aSamples, Math.round(tEnd * sr)); }
          else { while(ai < aSamples && ai * 1024 / sr < tEnd) ai++; }
          if(ai > aStart){
            const parts = au.codec === 'lpcm'
              ? [new Uint8Array(this.pcm.buffer, this.pcm.byteOffset + aStart * ch * 2, (ai - aStart) * ch * 2)]
              : this.a.slice(aStart, ai).map(s => s.data);
            const c = {track:'a', first:aStart, count:ai - aStart, parts}; chunks.push(c); aChunks.push(c);
          }
        }
        sec++; if(sec > total + 5) break;
      }
      let rel = 0; for(const c of chunks){ c.rel = rel; for(const p of c.parts) rel += p.length; }
      const mdatSize = rel + 8;

      const build = base => {
        const movieDur = Math.round(Math.max(vDurSec, hasAudio ? aDurSec : 0) * 1000);
        const tracks = [this._videoTrak(base, vChunks, ctts, needCtts, shift, vDurTs, Math.round(vDurSec * 1000), mov)];
        if(hasAudio) tracks.push(this._audioTrak(base, aChunks, aSamples, aDurTs, Math.round(aDurSec * 1000), mov));
        const mvhd = full('mvhd', 0, 0, u32(0), u32(0), u32(1000), u32(movieDur), u32(0x00010000), u16(0x0100), zeros(10), MATRIX, zeros(24), u32(tracks.length + 1));
        return box('moov', mvhd, ...tracks);
      };
      const ftyp = mov ? box('ftyp', str('qt  '), u32(0), str('qt  '))
                       : box('ftyp', str('isom'), u32(0x200), str('isom'), str('iso2'), str('avc1'), str('mp41'));
      let moov = build(0);
      moov = build(ftyp.length + moov.length);
      if(mdatSize > 0xFFFFFFFF) throw new Error('vidéo trop lourde');
      const parts = [ftyp, moov, cat([u32(mdatSize), str('mdat')])];
      for(const c of chunks) for(const p of c.parts) parts.push(p);
      return new Blob(parts, {type: mov ? 'video/quicktime' : 'video/mp4'});
    }

    _tkhd(id, durMs, isAudio){
      const w = isAudio ? 0 : this.o.width, h = isAudio ? 0 : this.o.height;
      return full('tkhd', 0, 3, u32(0), u32(0), u32(id), u32(0), u32(durMs), zeros(8), u16(0), u16(isAudio ? 1 : 0), u16(isAudio ? 0x0100 : 0), u16(0), MATRIX, u32(w << 16 >>> 0), u32(h << 16 >>> 0));
    }
    _hdlr(type, name, mov){
      return full('hdlr', 0, 0, mov ? str('mhlr') : u32(0), str(type), zeros(12), mov ? cat([u8(name.length), str(name)]) : cat([str(name), u8(0)]));
    }
    _minfTail(mov){
      const dinf = box('dinf', full('dref', 0, 0, u32(1), full('url ', 0, 1)));
      return mov ? [full('hdlr', 0, 0, str('dhlr'), str('url '), zeros(12), cat([u8(11), str('DataHandler')])), dinf] : [dinf];
    }
    _stsc(list){
      const e = []; let prev = -1;
      list.forEach((c, i) => { if(c.count !== prev){ e.push([i + 1, c.count]); prev = c.count; } });
      return full('stsc', 0, 0, u32(e.length), ...e.map(([f, n]) => cat([u32(f), u32(n), u32(1)])));
    }
    _stco(list, base){ return full('stco', 0, 0, u32(list.length), ...list.map(c => u32(base + 8 + c.rel))); }

    _videoTrak(base, list, ctts, needCtts, shift, durTs, durMs, mov){
      const o = this.o, nV = this.v.length;
      const name = 'H.264';
      const avc1 = box('avc1', zeros(6), u16(1), u16(0), u16(0), zeros(12), u16(o.width), u16(o.height), u32(0x00480000), u32(0x00480000), u32(0), u16(1),
        cat([u8(name.length), str(name), zeros(31 - name.length)]), u16(0x18), u16(0xFFFF), box('avcC', this.avcC));
      const stsd = full('stsd', 0, 0, u32(1), avc1);
      const stts = full('stts', 0, 0, u32(1), u32(nV), u32(1000));
      const keys = []; this.v.forEach((s, i) => { if(s.key) keys.push(i + 1); });
      const stss = full('stss', 0, 0, u32(keys.length), ...keys.map(k => u32(k)));
      const stsz = full('stsz', 0, 0, u32(0), u32(nV), ...this.v.map(s => u32(s.data.length)));
      const stblParts = [stsd, stts];
      if(needCtts){
        const runs = []; for(const c of ctts){ const r = runs[runs.length - 1]; if(r && r[1] === c) r[0]++; else runs.push([1, c]); }
        stblParts.push(full('ctts', 0, 0, u32(runs.length), ...runs.map(([n, c]) => cat([u32(n), u32(c)]))));
      }
      stblParts.push(stss, this._stsc(list), stsz, this._stco(list, base));
      const minf = box('minf', full('vmhd', 0, 1, zeros(8)), ...this._minfTail(mov), box('stbl', ...stblParts));
      const mdia = box('mdia', full('mdhd', 0, 0, u32(0), u32(0), u32(this.vts), u32(durTs), u16(0x55C4), u16(0)), this._hdlr('vide', 'VideoHandler', mov), minf);
      const edts = box('edts', full('elst', 0, 0, u32(1), u32(durMs), i32(shift), u32(0x00010000)));
      return box('trak', this._tkhd(1, durMs, false), edts, mdia);
    }

    _audioTrak(base, list, nSamples, durTs, durMs, mov){
      const au = this.o.audio, sr = au.sampleRate, ch = au.channels;
      let entry, stts, stsz;
      if(au.codec === 'lpcm'){
        entry = box('sowt', zeros(6), u16(1), u16(0), u16(0), u32(0), u16(ch), u16(16), u16(0), u16(0), u32((sr << 16) >>> 0));
        stts = full('stts', 0, 0, u32(1), u32(nSamples), u32(1));
        stsz = full('stsz', 0, 0, u32(2 * ch), u32(nSamples));
      } else {
        const asc = this.asc;
        const dsi = cat([u8(0x05), u8(asc.length), asc]);
        const dcd = cat([u8(0x04), u8(13 + dsi.length), u8(0x40), u8(0x15), u24(0), u32(192000), u32(128000), dsi]);
        const esd = cat([u8(0x03), u8(3 + dcd.length + 3), u16(1), u8(0), dcd, u8(0x06), u8(1), u8(0x02)]);
        entry = box('mp4a', zeros(6), u16(1), zeros(8), u16(ch), u16(16), u16(0), u16(0), u32((sr << 16) >>> 0), full('esds', 0, 0, esd));
        stts = full('stts', 0, 0, u32(1), u32(nSamples), u32(1024));
        stsz = full('stsz', 0, 0, u32(0), u32(nSamples), ...this.a.map(s => u32(s.data.length)));
      }
      const stbl = box('stbl', full('stsd', 0, 0, u32(1), entry), stts, this._stsc(list), stsz, this._stco(list, base));
      const minf = box('minf', full('smhd', 0, 0, u16(0), u16(0)), ...this._minfTail(mov), stbl);
      const mdia = box('mdia', full('mdhd', 0, 0, u32(0), u32(0), u32(sr), u32(durTs), u16(0x55C4), u16(0)), this._hdlr('soun', 'SoundHandler', mov), minf);
      return box('trak', this._tkhd(2, durMs, true), mdia);
    }
  }
  function toU8(x){
    if(x instanceof Uint8Array) return x;
    if(ArrayBuffer.isView(x)) return new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
    return new Uint8Array(x);
  }
  function makeASC(sr, ch){
    const rates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
    const fi = Math.max(0, rates.indexOf(sr));
    return new Uint8Array([(2 << 3) | (fi >> 1), ((fi & 1) << 7) | (ch << 3)]);
  }
  /* Son flottant planaire → PCM 16 bits entrelacé */
  function toInt16(planar, frames){
    const ch = planar.length, out = new Int16Array(frames * ch);
    for(let i=0;i<frames;i++) for(let c=0;c<ch;c++){ let x = planar[c][i]; x = x < -1 ? -1 : x > 1 ? 1 : x; out[i*ch + c] = x < 0 ? x * 0x8000 : x * 0x7FFF; }
    return out;
  }
  global.TilawaMux = {Muxer, toInt16, makeASC};
})(typeof window !== 'undefined' ? window : globalThis);
