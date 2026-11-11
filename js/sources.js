/* Tilawa — récitateurs et son.
   Deux sources :
   - everyayah.com : un fichier par verset → synchro parfaite ;
   - mp3quran.net : plus de 200 récitateurs, un fichier par sourate. Minutage officiel des versets
     quand mp3quran le fournit (synchro exacte), sinon repérage automatique des pauses. */
(function(global){
  'use strict';
  const PROXY = '/api/proxy?u=';
  const direct = {};   // hôte → true (accès direct OK) / false (passer par le relais)
  const hostOf = u => { try { return new URL(u).hostname; } catch(e){ return ''; } };

  async function fetchVia(url, init, viaProxy){
    const u = viaProxy ? PROXY + encodeURIComponent(url) : url;
    const r = await fetch(u, Object.assign({mode:'cors', credentials:'omit'}, init || {}));
    if(!r.ok && r.status !== 206) throw Object.assign(new Error('HTTP ' + r.status), {status: r.status});
    return r;
  }
  /* Essaie d'abord en direct (plus rapide, ne charge pas le relais), sinon via le relais */
  async function smartFetch(url, init){
    const h = hostOf(url);
    if(direct[h] !== false){
      try { const r = await fetchVia(url, init, false); direct[h] = true; return r; }
      catch(e){ if(e.status === 404) throw e; direct[h] = false; }
    }
    return fetchVia(url, init, true);
  }
  async function getJSON(url){ const r = await smartFetch(url); return r.json(); }
  async function getBuffer(url, init){ const r = await smartFetch(url, init); return {res: r, buf: await r.arrayBuffer()}; }

  /* ---------- Récitateurs everyayah (un fichier par verset) ---------- */
  const EA = [
    ['Alafasy_128kbps', 'Mishary Rashid Alafasy'],
    ['Abdul_Basit_Murattal_64kbps', 'Abdul Basit Abdus-Samad (murattal)'],
    ['Abdul_Basit_Mujawwad_128kbps', 'Abdul Basit Abdus-Samad (mujawwad)'],
    ['Abdurrahmaan_As-Sudais_192kbps', 'Abdurrahman As-Sudais'],
    ['Saood_ash-Shuraym_128kbps', 'Saud Ash-Shuraim'],
    ['Maher_AlMuaiqly_64kbps', 'Maher Al-Muaiqly'],
    ['Yasser_Ad-Dussary_128kbps', 'Yasser Al-Dossari'],
    ['Nasser_Alqatami_128kbps', 'Nasser Al-Qatami'],
    ['Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net', 'Ahmed Al-Ajmi'],
    ['Ghamadi_40kbps', 'Saad Al-Ghamdi'],
    ['Abu_Bakr_Ash-Shaatree_128kbps', 'Abu Bakr Ash-Shatri'],
    ['Hani_Rifai_192kbps', 'Hani Ar-Rifai'],
    ['Husary_64kbps', 'Mahmoud Khalil Al-Husary'],
    ['Minshawy_Murattal_128kbps', 'Muhammad Siddiq Al-Minshawi (murattal)'],
    ['Minshawy_Mujawwad_192kbps', 'Muhammad Siddiq Al-Minshawi (mujawwad)'],
    ['Mohammad_al_Tablaway_128kbps', 'Mohammad At-Tablawi'],
    ['Fares_Abbad_64kbps', 'Fares Abbad'],
    ['Muhammad_Jibreel_128kbps', 'Muhammad Jibreel'],
    ['Muhammad_Ayyoub_128kbps', 'Muhammad Ayyoub'],
    ['Abdullaah_3awwaad_Al-Juhaynee_128kbps', 'Abdullah Al-Juhany'],
    ['Hudhaify_128kbps', 'Ali Al-Hudhaify'],
    ['Khaalid_Abdullaah_al-Qahtaanee_192kbps', 'Khalid Al-Qahtani'],
    ['Salaah_AbdulRahman_Bukhatir_128kbps', 'Salah Bukhatir'],
    ['Abdullah_Basfar_192kbps', 'Abdullah Basfar'],
    ['Ali_Jaber_64kbps', 'Ali Jaber'],
    ['Muhsin_Al_Qasim_192kbps', 'Abdul Muhsin Al-Qasim'],
    ['Aziz_Alili_128kbps', 'Aziz Alili'],
    ['Akram_AlAlaqimy_128kbps', 'Akram Al-Alaqimy'],
    ['Ibrahim_Akhdar_32kbps', 'Ibrahim Al-Akhdar'],
    ['Yaser_Salamah_128kbps', 'Yaser Salamah']
  ].map(([folder, name]) => ({id: 'ea:' + folder, name, folder, source: 'everyayah', exact: true, style: 'Hafs · un fichier par verset'}));

  /* ---------- Catalogue mp3quran ---------- */
  const MQ = 'https://mp3quran.net/api/v3/';
  const normDir = u => String(u || '').replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, '').toLowerCase();
  let catalog = null;
  async function loadCatalog(){
    if(catalog) return catalog;
    const cached = readCache('tilawa.catalog.v1', 7 * 864e5);
    if(cached){ catalog = cached; return catalog; }
    const [rec, reads] = await Promise.all([
      getJSON(MQ + 'reciters?language=fr'),
      getJSON(MQ + 'ayat_timing/reads').catch(() => [])
    ]);
    const timed = new Map();
    for(const r of (Array.isArray(reads) ? reads : (reads && reads.reads) || [])) if(r && r.folder_url) timed.set(normDir(r.folder_url), r.id);
    const list = [];
    for(const r of (rec && rec.reciters) || []){
      for(const m of r.moshaf || []){
        if(!m.server) continue;
        const read = timed.get(normDir(m.server)) || null;
        list.push({
          id: 'mq:' + r.id + ':' + m.id, name: String(r.name || '').trim(), style: String(m.name || '').trim(),
          server: m.server.endsWith('/') ? m.server : m.server + '/', surahs: String(m.surah_list || '').split(',').filter(Boolean).map(Number),
          source: 'mp3quran', read, exact: !!read
        });
      }
    }
    list.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    catalog = list; writeCache('tilawa.catalog.v1', list);
    return list;
  }
  function readCache(k, maxAge){ try { const o = JSON.parse(localStorage.getItem(k) || 'null'); if(o && Date.now() - o.t < maxAge) return o.v; } catch(e){} return null; }
  function writeCache(k, v){ try { localStorage.setItem(k, JSON.stringify({t: Date.now(), v})); } catch(e){} }

  /* ---------- Lecture d'en-tête MP3 (pour ne télécharger que le passage utile) ---------- */
  const BR = {1: [0,32,40,48,56,64,80,96,112,128,160,192,224,256,320], 2: [0,8,16,24,32,40,48,56,64,80,96,112,128,144,160]};
  const SR = {3: [44100,48000,32000], 2: [22050,24000,16000], 0: [11025,12000,8000]};
  function mp3Info(u8, total){
    let p = 0;
    if(u8[0] === 0x49 && u8[1] === 0x44 && u8[2] === 0x33){ const sz = (u8[6] << 21) | (u8[7] << 14) | (u8[8] << 7) | u8[9]; p = 10 + sz + ((u8[5] & 0x10) ? 10 : 0); }
    for(; p + 4 < u8.length; p++){
      if(u8[p] !== 0xFF || (u8[p+1] & 0xE0) !== 0xE0) continue;
      const ver = (u8[p+1] >> 3) & 3, layer = (u8[p+1] >> 1) & 3, bri = u8[p+2] >> 4, sri = (u8[p+2] >> 2) & 3;
      if(ver === 1 || layer !== 1 || bri === 0 || bri === 15 || sri === 3) continue;
      const kbps = BR[ver === 3 ? 1 : 2][bri], sr = SR[ver][sri], spf = ver === 3 ? 1152 : 576;
      const mono = (u8[p+3] >> 6) === 3, side = ver === 3 ? (mono ? 17 : 32) : (mono ? 9 : 17);
      const x = p + 4 + side, tag = String.fromCharCode(u8[x], u8[x+1], u8[x+2], u8[x+3]);
      const info = {start: p, kbps, sr, spf, vbr: false, frames: 0, bytes: 0, toc: null};
      if(tag === 'Xing' || tag === 'Info'){
        info.vbr = tag === 'Xing'; const fl = (u8[x+4] << 24) | (u8[x+5] << 16) | (u8[x+6] << 8) | u8[x+7]; let q = x + 8;
        if(fl & 1){ info.frames = ((u8[q] << 24) | (u8[q+1] << 16) | (u8[q+2] << 8) | u8[q+3]) >>> 0; q += 4; }
        if(fl & 2){ info.bytes = ((u8[q] << 24) | (u8[q+1] << 16) | (u8[q+2] << 8) | u8[q+3]) >>> 0; q += 4; }
        if(fl & 4){ info.toc = Array.from(u8.subarray(q, q + 100)); }
      }
      const audioBytes = (total || 0) - p;
      info.duration = info.frames ? info.frames * spf / sr : (audioBytes > 0 ? audioBytes * 8 / (kbps * 1000) : 0);
      return info;
    }
    return null;
  }
  function byteAt(info, total, t){
    t = Math.max(0, Math.min(info.duration, t));
    if(info.vbr && info.toc && info.duration){
      const pct = t / info.duration * 100, i = Math.min(99, Math.floor(pct)), a = info.toc[i], b = i < 99 ? info.toc[i+1] : 256;
      return Math.round(info.start + (a + (b - a) * (pct - i)) / 256 * (info.bytes || (total - info.start)));
    }
    return Math.round(info.start + t * info.kbps * 125);
  }
  function timeAt(info, total, byte){
    if(info.vbr && info.toc && info.duration){
      const f = (byte - info.start) / (info.bytes || (total - info.start)) * 256; let i = 0;
      while(i < 99 && info.toc[i+1] <= f) i++;
      const a = info.toc[i], b = i < 99 ? info.toc[i+1] : 256;
      return (i + (b > a ? (f - a) / (b - a) : 0)) / 100 * info.duration;
    }
    return (byte - info.start) / (info.kbps * 125);
  }
  /* Début du fichier + taille totale, sans tout télécharger */
  async function probe(url){
    const r = await smartFetch(url, {headers: {Range: 'bytes=0-65535'}});
    let total = 0;
    const cr = r.headers.get('content-range'); if(cr && /\/(\d+)/.test(cr)) total = +RegExp.$1;
    if(r.status === 206){ const u8 = new Uint8Array(await r.arrayBuffer()); return {u8, total, ranges: true}; }
    // Le serveur renvoie tout : on garde le fichier complet
    total = +(r.headers.get('content-length') || 0);
    const u8 = new Uint8Array(await r.arrayBuffer()); return {u8, total: total || u8.length, ranges: false, full: u8};
  }

  /* ---------- Construction du son pour une sélection ---------- */
  const pad3 = n => String(n).padStart(3, '0');
  async function poolMap(items, n, fn){
    const out = new Array(items.length); let i = 0;
    const worker = async () => { while(i < items.length){ const k = i++; out[k] = await fn(items[k], k); } };
    await Promise.all(Array.from({length: Math.min(n, items.length)}, worker));
    return out;
  }
  /* verses : [{n, basmala?}] dans l'ordre. ctx : {decode, sliceBuffer, concatBuffers, speechBounds, progress} */
  async function buildEveryayah(rec, surah, verses, ctx){
    let done = 0;
    const bufs = await poolMap(verses, 4, async v => {
      const file = v.basmala ? '001001' : pad3(surah) + pad3(v.n);
      const {buf} = await getBuffer('https://everyayah.com/data/' + rec.folder + '/' + file + '.mp3');
      const b = await ctx.decode(buf), sb = ctx.speechBounds(b);
      ctx.progress && ctx.progress(++done / verses.length);
      return ctx.sliceBuffer(b, Math.max(0, sb.first - 0.08), Math.min(b.duration, sb.last + 0.3));
    });
    const starts = []; let acc = 0;
    for(const b of bufs){ starts.push(Math.round(acc * 100) / 100); acc += b.duration; }
    return {buffer: ctx.concatBuffers(bufs), starts, exact: true};
  }
  const timingCache = new Map();
  async function getTiming(read, surah){
    const k = read + ':' + surah;
    if(!timingCache.has(k)) timingCache.set(k, getJSON(MQ + 'ayat_timing?surah=' + surah + '&read=' + read).catch(e => { timingCache.delete(k); throw e; }));
    return timingCache.get(k);
  }
  async function buildMp3quran(rec, surah, verses, ctx, weights){
    if(rec.surahs && rec.surahs.length && !rec.surahs.includes(surah)) throw Object.assign(new Error('absent'), {code: 'absent'});
    const url = rec.server + pad3(surah) + '.mp3';
    ctx.progress && ctx.progress(0.05);
    const head = await probe(url);
    const info = mp3Info(head.u8, head.total);
    const dur = info ? info.duration : 0;
    const hasB = verses[0] && verses[0].basmala, real = verses.filter(v => !v.basmala), first = real[0].n, last = real[real.length - 1].n;

    // 1. Où est le passage dans le fichier ?
    let t0, t1, marks = null, exact = false, needBasmala = false;
    if(rec.read){
      try {
        const tm = await getTiming(rec.read, surah);
        const arr = (Array.isArray(tm) ? tm : []).filter(x => x && x.ayah != null);
        const maxEnd = Math.max(...arr.map(x => +x.end_time || 0));
        const scale = dur && Math.abs(maxEnd / 1000 - dur) < Math.abs(maxEnd - dur) ? 1000 : (dur ? 1 : 1000);
        const at = n => arr.find(x => +x.ayah === n);
        const a = at(first), z = at(last);
        if(a && z){
          const intro = at(0), s1 = +a.start_time / scale;
          t0 = s1;
          if(hasB && first === 1){
            if(intro && (+intro.end_time - +intro.start_time) / scale > 1) t0 = +intro.start_time / scale;
            else if(s1 > 1.5) t0 = 0;              // Basmala (et isti'adha) avant le verset 1, sans entrée à part
            else needBasmala = true;               // Le fichier commence directement au verset 1
          }
          t1 = +z.end_time / scale;
          marks = []; if(hasB && !needBasmala) marks.push(t0);
          for(const v of real){ const e = at(v.n); marks.push(e ? +e.start_time / scale : NaN); }
          exact = marks.every(x => isFinite(x));
        }
      } catch(e){ /* minutage indisponible : repérage automatique */ }
    }
    let approx = false;
    if(t0 == null){
      if(!dur) throw new Error('durée inconnue');
      // Estimation par la longueur du texte, avec de la marge
      const W = weights.all, before = W.slice(0, first - 1).reduce((s, x) => s + x, 0), upto = W.slice(0, last).reduce((s, x) => s + x, 0), sum = W.reduce((s, x) => s + x, 0);
      const intro = Math.min(12, dur * 0.04);
      const est = x => intro + (dur - intro) * x / sum;
      t0 = first === 1 ? 0 : Math.max(0, est(before) - Math.max(3, dur * 0.03));
      t1 = last === W.length ? dur : Math.min(dur, est(upto) + Math.max(3, dur * 0.03));
      approx = !(first === 1 && last === W.length);
    }
    // 2. Téléchargement de la partie utile seulement (ou du fichier entier s'il est petit)
    let buf, base = 0;
    if(head.full){ buf = head.full.buffer; }
    else if(!info || head.total < 12e6 || !head.ranges){ buf = (await getBuffer(url)).buf; }
    else {
      const pad = info.vbr ? 4 : 1.2;
      const b0 = byteAt(info, head.total, Math.max(0, t0 - pad)), b1 = Math.min(head.total - 1, byteAt(info, head.total, t1 + pad));
      const got = await getBuffer(url, {headers: {Range: 'bytes=' + b0 + '-' + b1}});
      buf = got.buf; base = timeAt(info, head.total, b0);
    }
    ctx.progress && ctx.progress(0.7);
    const full = await ctx.decode(buf);
    const s0 = Math.max(0, t0 - base - (exact ? 0.05 : 0)), s1 = Math.min(full.duration, t1 - base + 0.25);
    const buffer = ctx.sliceBuffer(full, s0, s1);
    let starts = null;
    if(exact) starts = marks.map(m => Math.max(0, Math.round((m - base - s0) * 100) / 100));
    if(starts){ starts[0] = 0; for(let i = 1; i < starts.length; i++) if(!(starts[i] > starts[i-1])) { starts = null; break; } }
    if(needBasmala && starts){
      // Basmala prise dans Al-Fatiha, avec la même voix ; sinon on l'enlève de la vidéo
      try {
        const bas = await basmalaOf(rec, ctx);
        return {buffer: ctx.concatBuffers([bas, buffer]), starts: [0, ...starts.map(x => Math.round((x + bas.duration) * 100) / 100)], exact: true, approx};
      } catch(e){ return {buffer, starts, exact: true, approx, dropBasmala: true}; }
    }
    return {buffer, starts, exact: !!starts, approx};
  }
  async function basmalaOf(rec, ctx){
    if(!rec.read || (rec.surahs && rec.surahs.length && !rec.surahs.includes(1))) throw new Error('pas de Fatiha');
    const tm = await getTiming(rec.read, 1), e1 = (Array.isArray(tm) ? tm : []).find(x => +x.ayah === 1);
    if(!e1) throw new Error('pas de minutage');
    const full = await ctx.decode((await getBuffer(rec.server + '001.mp3')).buf);
    const maxEnd = Math.max(...tm.map(x => +x.end_time || 0)), scale = Math.abs(maxEnd / 1000 - full.duration) < Math.abs(maxEnd - full.duration) ? 1000 : 1;
    const part = ctx.sliceBuffer(full, Math.max(0, +e1.start_time / scale - 0.05), Math.min(full.duration, +e1.end_time / scale + 0.1));
    const sb = ctx.speechBounds(part);
    return ctx.sliceBuffer(part, Math.max(0, sb.first - 0.08), Math.min(part.duration, sb.last + 0.35));
  }
  async function build(rec, surah, verses, ctx, weights){
    if(rec.source === 'everyayah') return buildEveryayah(rec, surah, verses, ctx);
    return buildMp3quran(rec, surah, verses, ctx, weights);
  }

  /* Récitateurs mis en avant (souvent sur TikTok) */
  const POPULAR = [/d[ou]{1,2}s{1,2}ar/i, /luhaid|lohaid/i, /sobhi/i, /kurdi/i, /salimi/i, /nuf[ae]is|nofais/i, /mossad|mosad/i, /turk/i, /hazz?a|balush/i, /m[eu]+a[iq]+l|maher al/i, /s[ou]+dais/i, /sh?ura[iy]m|chouraim|shureim/i, /gh?am[ie]?di|ghamadi/i, /ajam|ajmi/i, /[qk]atami/i, /afas/i, /abbad/i, /abd ?el ?bass?it|abdul ?basit|abdelbasset/i, /m[ei]n[cs]hawi|minshaw/i, /h[ou]s+ar[iy]/i, /balil|baleel/i, /jal+il/i, /juh[ae]n|juhayn/i];
  const isPopular = name => POPULAR.some(re => re.test(name));

  global.TilawaSources = {EA, loadCatalog, build, isPopular, getJSON, smartFetch, mp3Info};
})(window);
