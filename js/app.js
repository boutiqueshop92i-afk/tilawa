
'use strict';
/* ---------- Données ---------- */
const SURAHS = [
['Al-Fatiha',"L'Ouverture",7],['Al-Baqara','La Vache',286],['Al-Imran',"La Famille d'Imran",200],['An-Nisa','Les Femmes',176],['Al-Maida','La Table servie',120],
['Al-Anam','Les Bestiaux',165],['Al-Araf','Les Murailles',206],['Al-Anfal','Le Butin',75],['At-Tawba','Le Repentir',129],['Yunus','Jonas',109],
['Hud','Hud',123],['Yusuf','Joseph',111],['Ar-Rad','Le Tonnerre',43],['Ibrahim','Abraham',52],['Al-Hijr','Al-Hijr',99],
['An-Nahl','Les Abeilles',128],['Al-Isra','Le Voyage nocturne',111],['Al-Kahf','La Caverne',110],['Maryam','Marie',98],['Ta-Ha','Ta-Ha',135],
['Al-Anbiya','Les Prophètes',112],['Al-Hajj','Le Pèlerinage',78],['Al-Muminun','Les Croyants',118],['An-Nur','La Lumière',64],['Al-Furqan','Le Discernement',77],
['Ash-Shuara','Les Poètes',227],['An-Naml','Les Fourmis',93],['Al-Qasas','Le Récit',88],['Al-Ankabut',"L'Araignée",69],['Ar-Rum','Les Romains',60],
['Luqman','Luqman',34],['As-Sajda','La Prosternation',30],['Al-Ahzab','Les Coalisés',73],['Saba','Saba',54],['Fatir','Le Créateur',45],
['Ya-Sin','Ya-Sin',83],['As-Saffat','Les Rangés',182],['Sad','Sad',88],['Az-Zumar','Les Groupes',75],['Ghafir','Le Pardonneur',85],
['Fussilat','Les Versets détaillés',54],['Ash-Shura','La Consultation',53],['Az-Zukhruf',"L'Ornement",89],['Ad-Dukhan','La Fumée',59],['Al-Jathiya',"L'Agenouillée",37],
['Al-Ahqaf','Al-Ahqaf',35],['Muhammad','Muhammad',38],['Al-Fath','La Victoire éclatante',29],['Al-Hujurat','Les Appartements',18],['Qaf','Qaf',45],
['Adh-Dhariyat','Qui éparpillent',60],['At-Tur','Le Mont',49],['An-Najm',"L'Étoile",62],['Al-Qamar','La Lune',55],['Ar-Rahman','Le Tout Miséricordieux',78],
['Al-Waqia',"L'Événement",96],['Al-Hadid','Le Fer',29],['Al-Mujadila','La Discussion',22],['Al-Hashr',"L'Exode",24],['Al-Mumtahana',"L'Éprouvée",13],
['As-Saff','Le Rang',14],['Al-Jumua','Le Vendredi',11],['Al-Munafiqun','Les Hypocrites',11],['At-Taghabun','La Grande Perte',18],['At-Talaq','Le Divorce',12],
['At-Tahrim',"L'Interdiction",12],['Al-Mulk','La Royauté',30],['Al-Qalam','La Plume',52],['Al-Haqqa','Celle qui montre la vérité',52],['Al-Maarij',"Les Voies d'ascension",44],
['Nuh','Noé',28],['Al-Jinn','Les Djinns',28],['Al-Muzzammil',"L'Enveloppé",20],['Al-Muddaththir',"Le Revêtu d'un manteau",56],['Al-Qiyama','La Résurrection',40],
['Al-Insan',"L'Homme",31],['Al-Mursalat','Les Envoyés',50],['An-Naba','La Nouvelle',40],['An-Naziat','Les Anges qui arrachent',46],['Abasa',"Il s'est renfrogné",42],
['At-Takwir',"L'Obscurcissement",29],['Al-Infitar','La Rupture',19],['Al-Mutaffifin','Les Fraudeurs',36],['Al-Inshiqaq','La Déchirure',25],['Al-Buruj','Les Constellations',22],
['At-Tariq',"L'Astre nocturne",17],['Al-Ala','Le Très-Haut',19],['Al-Ghashiya',"L'Enveloppante",26],['Al-Fajr',"L'Aube",30],['Al-Balad','La Cité',20],
['Ash-Shams','Le Soleil',15],['Al-Layl','La Nuit',21],['Ad-Duha','Le Jour montant',11],['Ash-Sharh','La Dilatation',8],['At-Tin','Le Figuier',8],
['Al-Alaq',"L'Adhérence",19],['Al-Qadr','La Destinée',5],['Al-Bayyina','La Preuve',8],['Az-Zalzala','La Secousse',8],['Al-Adiyat','Les Coursiers',11],
['Al-Qaria','Le Fracas',11],['At-Takathur','La Course aux richesses',8],['Al-Asr','Le Temps',3],['Al-Humaza','Les Calomniateurs',9],['Al-Fil',"L'Éléphant",5],
['Quraysh','Quraysh',4],['Al-Maun',"L'Ustensile",7],['Al-Kawthar',"L'Abondance",3],['Al-Kafirun','Les Infidèles',6],['An-Nasr','Le Secours',3],
['Al-Masad','Les Fibres',5],['Al-Ikhlas','Le Monothéisme pur',4],['Al-Falaq',"L'Aube naissante",5],['An-Nas','Les Hommes',6]
];
const CDN = 'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/';
const W = 1080, H = 1920;
const LH = {'Amiri Quran':2.05,'Scheherazade New':1.95,'Noto Naskh Arabic':1.85,'Amiri':2.0};
const TEXT_COLORS = [['#ffffff','Blanc'],['#f3e9d2','Crème'],['#ecd08a','Or clair'],['#14110a','Noir']];
const ACCENTS = [['#d6b25e','Or'],['#cfd8e3','Argent'],['#74d3aa','Émeraude'],['#e9a07a','Ambre']];
const MAX_VERSES = 286;
const LONG_VERSES = 40;
const TEXT_Y = 830;

const DEF_STYLE = {bg:'etoiles.nuit',overlay:0.15,arFont:'Amiri Quran',arSize:80,trSize:36,textColor:'#ffffff',accent:'#d6b25e',
  showNum:true,header:true,viz:true,progress:true,reciter:'',reciterAuto:true,handle:''};

const S = {
  surah:112, from:1, to:4, lang:'fr',
  chapter:null, verses:[], manual:false, basmalaOn:true, basmalaVerse:null,
  audioMode:'reciter', reciter:null, recExact:false, fmt:'auto',
  srcBuffer:null, multiBuffer:null, everyayah:false, buffer:null, trim:{start:0,end:0}, multiDurs:[], fileName:'',
  starts:[], durs:[],
  style:Object.assign({}, DEF_STYLE),
  media:{img:null, video:null, imgUrl:'', vidUrl:''},
  res:1080, muteMonitor:false,
  result:null
};

/* ---------- Utilitaires ---------- */
const $ = id => document.getElementById(id);
const clamp = (v,a,b) => Math.min(b, Math.max(a, v));
const clamp01 = v => clamp(v,0,1);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const mk = (w,h) => { const c = document.createElement('canvas'); c.width = Math.max(1,Math.ceil(w)); c.height = Math.max(1,Math.ceil(h)); return c; };
const toAr = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const fmt = s => { s = Math.max(0, s||0); const m = Math.floor(s/60), r = Math.floor(s%60); return m + ':' + String(r).padStart(2,'0'); };
const round1 = v => Math.round(v*10)/10;
function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function bare(ar){ return (ar||'').replace(/[ً-ٰٟۖ-ۭ࣓-ࣿـ]/g,''); }
let toastTimer = 0;
function toast(msg, ms){ const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => t.hidden = true, ms || 4200); }
function setStatus(el, msg, kind){ el.textContent = msg || ''; el.className = 'status' + (kind ? ' ' + kind : ''); }
function store(){ try { localStorage.setItem('tilawa.v1', JSON.stringify({style:S.style, lang:S.lang, res:S.res, reciter:S.reciter})); } catch(e){} }
function restore(){ try { const o = JSON.parse(localStorage.getItem('tilawa.v1') || 'null'); if(!o) return;
  Object.assign(S.style, o.style || {}); if(!TilawaScenes.ALL.some(b => b.id === S.style.bg)) S.style.bg = DEF_STYLE.bg;
  if(o.lang) S.lang = o.lang; if(o.res) S.res = o.res; if(o.reciter && o.reciter.id) S.reciter = o.reciter; } catch(e){} }

/* ---------- Audio ---------- */
let AC = null;
function playbackSession(){ try { if(navigator.audioSession && navigator.audioSession.type !== 'playback') navigator.audioSession.type = 'playback'; } catch(e){} }
playbackSession();
function ac(){
  if(!AC || AC.state === 'closed'){ playbackSession(); const C = window.AudioContext || window.webkitAudioContext; AC = new C(); }
  return AC;
}
async function wakeAudio(){
  playbackSession(); const ctx = ac();
  if(ctx.state !== 'running'){ try { await withTimeout(ctx.resume(), 1500, 'audio'); } catch(e){} }
  return ctx;
}
function decode(arr){ return new Promise((res, rej) => { try { const p = ac().decodeAudioData(arr, res, rej); if(p && p.then) p.then(res, rej); } catch(e){ rej(e); } }); }
function sliceBuffer(b, s, e){
  const sr = b.sampleRate, a = clamp(Math.floor(s*sr), 0, b.length), z = clamp(Math.floor(e*sr), a+1, b.length);
  const out = ac().createBuffer(b.numberOfChannels, Math.max(1, z-a), sr);
  for(let c=0;c<b.numberOfChannels;c++) out.getChannelData(c).set(b.getChannelData(c).subarray(a, z));
  return out;
}
function concatBuffers(list){
  const sr = ac().sampleRate, ch = Math.max(...list.map(b => b.numberOfChannels));
  const len = list.reduce((n,b) => n + b.length, 0);
  const out = ac().createBuffer(ch, Math.max(1,len), sr);
  let off = 0;
  for(const b of list){ for(let c=0;c<ch;c++){ out.getChannelData(c).set(b.getChannelData(Math.min(c, b.numberOfChannels-1)), off); } off += b.length; }
  return out;
}
/* Énergie par fenêtre de 20 ms */
function envelope(b){
  const sr = b.sampleRate, win = Math.max(1, Math.round(sr*0.02));
  const d0 = b.getChannelData(0), d1 = b.numberOfChannels > 1 ? b.getChannelData(1) : null;
  const n = Math.floor(b.length / win), rms = new Float32Array(n);
  for(let i=0;i<n;i++){ let s = 0; const o = i*win; for(let j=0;j<win;j+=2){ let x = d0[o+j]; if(d1) x = (x + d1[o+j]) * 0.5; s += x*x; } rms[i] = Math.sqrt(s/(win/2)); }
  const sorted = Float32Array.from(rms).sort();
  const p10 = sorted[Math.floor(n*0.10)] || 0, p90 = sorted[Math.floor(n*0.90)] || 0;
  return {rms, step:0.02, thr: p10 + (p90 - p10) * 0.09};
}
function speechBounds(b){
  const {rms, step, thr} = envelope(b), edge = Math.min(thr, 0.006); let a = 0, z = rms.length - 1;
  while(a < rms.length && rms[a] < edge) a++;
  while(z > a && rms[z] < edge) z--;
  return {first: a*step, last: (z+1)*step};
}
/* Repère les N-1 plus longues pauses pour placer les débuts de versets */
function detectStarts(b, N){
  if(N <= 1) return [0];
  const {rms, step, thr} = envelope(b);
  const runs = []; let st = -1;
  for(let i=0;i<=rms.length;i++){
    const sil = i < rms.length && rms[i] < thr;
    if(sil && st < 0) st = i;
    if(!sil && st >= 0){ runs.push({a: st*step, b: i*step}); st = -1; }
  }
  const sb = speechBounds(b);
  const inner = runs.filter(r => r.a > sb.first + 0.4 && r.b < sb.last - 0.1 && (r.b - r.a) >= 0.16);
  if(inner.length < N-1) return null;
  inner.sort((x,y) => (y.b - y.a) - (x.b - x.a));
  const pick = inner.slice(0, N-1).sort((x,y) => x.a - y.a);
  return [0, ...pick.map(r => round1(Math.max(r.a, r.b - 0.15)))];
}
function weightedStarts(total, from, startAt){
  const vs = S.verses.slice(from), w = vs.map(v => Math.max(4, bare(v.ar).length)), sum = w.reduce((a,b) => a+b, 0);
  const out = []; let acc = startAt;
  for(let i=0;i<vs.length;i++){ out.push(round1(acc)); acc += (total - startAt) * w[i] / sum; }
  return out;
}
function audioOn(){ return S.audioMode !== 'none' && !!S.buffer; }
function totalDur(){
  if(audioOn()) return S.buffer.duration + 0.6;
  return S.durs.reduce((a,b) => a + (b||0), 0) || 1;
}
function times(){
  const N = S.verses.length, D = totalDur(), st = [];
  if(audioOn()){ for(let i=0;i<N;i++) st.push(S.starts[i] ?? (i === 0 ? 0 : Infinity)); }
  else { let a = 0; for(let i=0;i<N;i++){ st.push(a); a += S.durs[i] || 4; } }
  return st.map((s,i) => ({start:s, end: i < N-1 ? Math.min(D, st[i+1]) : D}));
}
function defaultDur(v){ return clamp(Math.round((2.5 + bare(v.ar).length * 0.11) * 2) / 2, 3, 150); }

/* ---------- Texte coranique ---------- */
const cache = {};
function normalize(d){
  if(d && d.default) d = d.default;
  const ch = Array.isArray(d) ? d[0] : d;
  if(!ch || !Array.isArray(ch.verses)) throw new Error('format');
  const isAr = s => typeof s === 'string' && /[؀-ۿ]/.test(s);
  const verses = ch.verses.map((v,i) => {
    let ar = isAr(v.text) ? v.text : ''; if(!ar) for(const k in v){ if(isAr(v[k])){ ar = v[k]; break; } }
    return {n: v.id ?? i+1, ar, tr: typeof v.translation === 'string' ? v.translation : ''};
  });
  return {name: ch.name || '', translit: ch.transliteration || '', verses};
}
async function loadChapter(n, lang){
  const key = lang + '/' + n; if(cache[key]) return cache[key];
  const url = CDN + lang + '/' + n + '.json';
  let data = null;
  try { const m = await import(url + '/+esm'); data = m.default || m; } catch(e){}
  if(!data){ try { const r = await fetch(url); if(r.ok) data = await r.json(); } catch(e){} }
  if(!data) throw new Error('load');
  const ch = normalize(data); ch.surah = n;
  return cache[key] = ch;
}
let loadSeq = 0;
async function loadSelection(){
  const seq = ++loadSeq, s = S.surah, lang = S.lang === 'en' ? 'en' : 'fr';
  setStatus($('loadStatus'), 'Chargement de la sourate ' + SURAHS[s-1][0] + '…');
  showMsg('Chargement du texte…');
  try {
    const ch = await loadChapter(s, lang);
    let bv = null; try { const f = await loadChapter(1, lang); bv = f.verses[0] ? {n:0, ar:f.verses[0].ar, tr:f.verses[0].tr, basmala:true} : null; } catch(e){}
    if(seq !== loadSeq) return;
    S.chapter = ch; S.manual = false; S.basmalaVerse = bv;
    applyRange();
  } catch(e){
    if(seq !== loadSeq) return;
    S.chapter = null; S.verses = []; renderVerseList(); onVersesChanged();
    setStatus($('loadStatus'), "Le texte n'a pas pu être chargé (connexion au serveur du Coran bloquée). Vérifie ta connexion puis rechoisis la sourate, ou colle le texte ci-dessous.", 'bad');
    $('manualBox').open = true;
    showMsg('Texte non chargé : voir l’étape 1.');
  }
}
function applyRange(){
  const count = S.chapter ? S.chapter.verses.length : SURAHS[S.surah-1][2];
  let f = clamp(parseInt($('inFrom').value,10) || 1, 1, count);
  let t = clamp(parseInt($('inTo').value,10) || f, f, count);
  if(t - f + 1 > MAX_VERSES){ t = f + MAX_VERSES - 1; toast('Maximum ' + MAX_VERSES + ' versets par vidéo.'); }
  $('inFrom').value = f; $('inTo').value = t; $('inFrom').max = count; $('inTo').max = count;
  S.from = f; S.to = t;
  if(S.chapter && S.chapter.surah !== S.surah && !S.manual) return;
  if(S.chapter && !S.manual){
    S.verses = S.chapter.verses.slice(f-1, t).map(v => ({n:v.n, ar:v.ar, tr:v.tr}));
    if(basmalaAllowed() && S.basmalaOn && S.basmalaVerse) S.verses.unshift(Object.assign({}, S.basmalaVerse));
    const long = S.verses.length > LONG_VERSES;
    setStatus($('loadStatus'), (S.verses[0] && S.verses[0].basmala ? 'Basmala + ' : '') + (t - f + 1) + ((t - f + 1) > 1 ? ' versets' : ' verset') + ' · ' + SURAHS[S.surah-1][0] + ' ' + S.surah + ':' + f + (t > f ? '–' + t : '') + (t - f + 1 === count ? ' · sourate complète' : '') + (long ? '. Vidéo longue : l\u2019export dure aussi longtemps que la récitation, et un téléphone peut manquer de mémoire au-delà de 15 à 20 minutes de son.' : ''), long ? 'warn' : 'good');
  }
  $('basmalaRow').hidden = !(basmalaAllowed() && S.basmalaVerse && !S.manual);
  renderVerseList(); onVersesChanged();
}
function basmalaAllowed(){ return S.from === 1 && S.surah !== 1 && S.surah !== 9; }
function verseLabel(v){ return v.basmala ? 'Basmala' : 'Verset ' + v.n; }
function renderVerseList(){
  const ol = $('verseList'); ol.textContent = '';
  for(const v of S.verses){
    const li = document.createElement('li');
    const n = document.createElement('span'); n.className = 'num'; n.textContent = verseLabel(v).toUpperCase();
    const a = document.createElement('div'); a.className = 'ar'; a.lang = 'ar'; a.textContent = v.ar;
    li.append(n, a);
    if(S.lang !== 'none' && v.tr){ const t = document.createElement('div'); t.className = 'tr'; t.textContent = v.tr; li.append(t); }
    ol.append(li);
  }
}
function onVersesChanged(){
  S.durs = S.verses.map(defaultDur);
  if(S.audioMode === 'single' && S.approxFrom){ S.approxFrom = false; setAudioMode('reciter'); }
  else if(S.audioMode === 'single' && S.buffer) runDetect(true);
  else if(S.audioMode === 'multi' && S.buffer) multiStarts();
  else if(S.audioMode === 'reciter') buildReciter();
  if(S.verses.length) hideMsg();
  rebuild(); renderTimings(); updateCaption();
}

/* ---------- Mise en page du texte (pré-rendu) ---------- */
const MEAS = mk(8,8).getContext('2d');
let blockCache = new Map(), layoutReady = false, prefetchFor = -1;
const C = {};
function getBlock(i){
  if(blockCache.has(i)){ const b = blockCache.get(i); blockCache.delete(i); blockCache.set(i, b); return b; }
  const v = S.verses[i]; if(!v) return null;
  const b = layoutVerse(v); blockCache.set(i, b);
  while(blockCache.size > 8) blockCache.delete(blockCache.keys().next().value);
  return b;
}
function arFontStr(size){ return `${size}px "${S.style.arFont}", "Amiri Quran", "Amiri", serif`; }
function trFontStr(size){ return `italic 400 ${size}px "Lora", Georgia, serif`; }
function wrap(g, text, maxW){
  const words = (text||'').split(/\s+/).filter(Boolean), lines = []; let cur = '';
  for(const w of words){ const test = cur ? cur + ' ' + w : w; if(!cur || g.measureText(test).width <= maxW) cur = test; else { lines.push(cur); cur = w; } }
  if(cur) lines.push(cur); return lines;
}
function withNum(v){
  if(!S.style.showNum || v.basmala) return v.ar;
  if(/[٠-٩۰-۹]\s*$/.test(v.ar)) return v.ar;
  return v.ar + ' ﴿' + toAr(v.n) + '﴾';
}
function hexA(hex, a){ const h = hex.replace('#',''); const n = parseInt(h.length === 3 ? h.split('').map(x => x+x).join('') : h, 16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; }
function isDark(hex){ const n = parseInt(hex.replace('#',''),16); return ((n>>16&255)*0.3 + (n>>8&255)*0.59 + (n&255)*0.11) < 90; }
function layoutVerse(v){
  const st = S.style, F = LH[st.arFont] || 1.95, maxW = 860;
  const ar = withNum(v), tr = S.lang !== 'none' ? (v.tr || '') : '';
  const arMax = tr ? 500 : 780, trMax = 260;
  const minSize = Math.max(40, Math.round(st.arSize * 0.62));
  let size = st.arSize, lines;
  for(;;){ MEAS.font = arFontStr(size); lines = wrap(MEAS, ar, maxW); if(lines.length * size * F <= arMax || size <= minSize) break; size -= 2; }
  const lpp = Math.max(1, Math.floor(arMax / (size * F)));
  const arPages = []; for(let i=0;i<lines.length;i+=lpp) arPages.push(lines.slice(i, i+lpp));
  if(!arPages.length) arPages.push(['']);
  const wts = arPages.map(p => Math.max(1, bare(p.join(' ')).length)), tot = wts.reduce((a,b) => a+b, 0);
  const trWords = tr.split(/\s+/).filter(Boolean), trPages = []; let wi = 0;
  for(let k=0;k<arPages.length;k++){ const take = k === arPages.length-1 ? trWords.length - wi : Math.round(trWords.length * wts[k] / tot); trPages.push(trWords.slice(wi, wi+take).join(' ')); wi += take; }
  return arPages.map((pl,k) => renderPage(pl, size, F, trPages[k] || '', wts[k], trMax));
}
function renderPage(arLines, size, F, tr, w, trMax){
  const st = S.style, pad = 40, lh = size * F;
  let tsize = st.trSize, tlines = [];
  if(tr){ for(;;){ MEAS.font = trFontStr(tsize); tlines = wrap(MEAS, tr, 840); if(tlines.length * tsize * 1.38 <= trMax || tsize <= 22) break; tsize -= 1; } }
  const arH = arLines.length * lh, trH = tlines.length * tsize * 1.38, mid = tr ? 70 : 0;
  const c = mk(W, pad*2 + arH + mid + trH), g = c.getContext('2d');
  const dark = isDark(st.textColor);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = dark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.62)'; g.shadowBlur = 18; g.shadowOffsetY = 2;
  g.fillStyle = st.textColor; g.font = arFontStr(size);
  try { g.direction = 'rtl'; } catch(e){}
  arLines.forEach((l,i) => g.fillText(l, W/2, pad + lh*(i+0.5)));
  if(tr){
    const y = pad + arH + mid/2;
    g.shadowBlur = 0; g.fillStyle = hexA(st.accent, .75);
    g.fillRect(W/2 - 60, y - 1, 120, 2);
    try { g.direction = 'ltr'; } catch(e){}
    g.shadowBlur = 12; g.fillStyle = hexA(st.textColor, .9); g.font = trFontStr(tsize);
    tlines.forEach((l,i) => g.fillText(l, W/2, pad + arH + mid + tsize*1.38*(i+0.5)));
  }
  return {c, h:c.height, w};
}
function buildHeader(){
  C.header = null;
  if(!S.style.header || !S.verses.length) return;
  const c = mk(W, 230), g = c.getContext('2d'), st = S.style;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 14;
  const name = S.chapter && S.chapter.name ? (S.chapter.name.startsWith('سورة') ? S.chapter.name : 'سورة ' + S.chapter.name) : '';
  if(name){ g.fillStyle = st.accent; g.font = `700 70px "Amiri", serif`; try { g.direction = 'rtl'; } catch(e){} g.fillText(name, W/2, 78); }
  try { g.direction = 'ltr'; } catch(e){}
  const range = S.to > S.from ? `VERSETS ${S.from}–${S.to}` : `VERSET ${S.from}`;
  g.font = `500 29px "IBM Plex Sans", sans-serif`; g.fillStyle = hexA(isDark(st.textColor) ? '#14110a' : '#ffffff', .85);
  const sub = SURAHS[S.surah-1][0].toUpperCase() + '   ·   ' + range;
  if('letterSpacing' in g) g.letterSpacing = '4px';
  g.fillText(sub, W/2, name ? 164 : 110);
  g.shadowBlur = 0; g.fillStyle = hexA(st.accent, .6);
  const yy = name ? 206 : 152; g.fillRect(W/2 - 90, yy, 180, 2);
  C.header = c;
}
function buildFooter(){
  C.footer = null; const st = S.style;
  const rec = (st.reciter||'').trim(), hd = (st.handle||'').trim();
  if(!rec && !hd) return;
  const c = mk(W, 130), g = c.getContext('2d');
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = 'rgba(0,0,0,.6)'; g.shadowBlur = 10;
  const light = isDark(st.textColor) ? '#14110a' : '#ffffff';
  if(rec){ g.font = `italic 400 36px "Lora", Georgia, serif`; g.fillStyle = hexA(light, .92); g.fillText(rec, W/2, 40); }
  if(hd){ g.font = `500 28px "IBM Plex Sans", sans-serif`; g.fillStyle = hexA(st.accent, .95); g.fillText(hd.startsWith('@') ? hd : '@' + hd, W/2, rec ? 95 : 40); }
  C.footer = c;
}
async function ensureFonts(){
  if(!document.fonts || !document.fonts.load) return;
  const st = S.style, arSample = S.verses.map(v => v.ar).join(' ').slice(0, 3000) + ' ﴿١٢٣﴾ سورة', trSample = S.verses.map(v => v.tr).join(' ').slice(0, 1500) + ' Récitation';
  const jobs = [
    document.fonts.load(`${st.arSize}px "${st.arFont}"`, arSample),
    document.fonts.load(`700 70px "Amiri"`, 'سورة ' + ((S.chapter && S.chapter.name) || 'الفاتحة')),
    document.fonts.load(`italic 400 36px "Lora"`, trSample),
    document.fonts.load(`500 29px "IBM Plex Sans"`, 'AL-FATIHA VERSETS 0123456789 @')
  ];
  await Promise.race([Promise.all(jobs).catch(() => {}), sleep(5000)]);
}
let rebuildTimer = 0, rebuildSeq = 0;
function rebuild(){ clearTimeout(rebuildTimer); rebuildTimer = setTimeout(doRebuild, 60); }
async function doRebuild(){
  const seq = ++rebuildSeq;
  await ensureFonts();
  if(seq !== rebuildSeq) return;
  blockCache = new Map(); layoutReady = true; prefetchFor = -1;
  buildHeader(); buildFooter();
  syncScrub();
  if(!P) render(currentT());
}

/* ---------- Fonds (scenes.js) ---------- */
function cover(ctx, src, sw, sh, k){ const s = Math.max(W/sw, H/sh) * k, dw = sw*s, dh = sh*s; ctx.drawImage(src, (W-dw)/2, (H-dh)/2, dw, dh); }
function drawBg(ctx, t, D){
  const bg = S.style.bg;
  if(bg === 'image' && S.media.img){ ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H); cover(ctx, S.media.img, S.media.img.naturalWidth, S.media.img.naturalHeight, 1 + 0.08*clamp01(t/(D||1))); return; }
  if(bg === 'video' && S.media.video){ const v = S.media.video; ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H); if(v.readyState >= 2 && v.videoWidth) cover(ctx, v, v.videoWidth, v.videoHeight, 1); return; }
  TilawaScenes.draw(ctx, bg === 'image' || bg === 'video' ? DEF_STYLE.bg : bg, t);
}
function vignette(){
  if(!C.vig){ const c = mk(W,H), g = c.getContext('2d'), rg = g.createRadialGradient(540,860,300,540,860,1250);
    rg.addColorStop(0,'rgba(0,0,0,0)'); rg.addColorStop(1,'rgba(0,0,0,.55)'); g.fillStyle = rg; g.fillRect(0,0,W,H); C.vig = c; }
  return C.vig;
}

/* ---------- Rendu d'une image ---------- */
const cv = $('cv'), CTX = cv.getContext('2d');
function rr(ctx, x, y, w, h, r){ if(ctx.roundRect){ ctx.beginPath(); ctx.roundRect(x,y,w,h,r); ctx.fill(); } else ctx.fillRect(x,y,w,h); }
function drawVerses(ctx, t, D){
  if(!layoutReady || !S.verses.length) return;
  const T = times(); let i = -1;
  for(let k=T.length-1;k>=0;k--){ if(T[k].start <= t){ i = k; break; } }
  if(i < 0) i = 0;
  const pages = getBlock(i); if(!pages) return;
  if(prefetchFor !== i && i + 1 < S.verses.length){ prefetchFor = i; const nx = i + 1; setTimeout(() => getBlock(nx), 30); }
  const {start, end} = T[i], dur = Math.max(0.01, end - start), tot = pages.reduce((a,p) => a + p.w, 0);
  let acc = 0;
  for(let k=0;k<pages.length;k++){
    const ps = start + dur*acc/tot; acc += pages[k].w; const pe = start + dur*acc/tot;
    if(t < pe || k === pages.length-1){
      const lastAll = i === T.length-1 && k === pages.length-1;
      const fin = clamp01((t - ps) / 0.45), fout = lastAll ? clamp01((D - t) / 0.6) : clamp01((pe - t) / 0.28);
      const a = Math.min(fin, fout), e = 1 - Math.pow(1 - fin, 3), p = pages[k];
      ctx.globalAlpha = a; ctx.drawImage(p.c, 0, TEXT_Y - p.h/2 + (1 - e)*22); ctx.globalAlpha = 1;
      break;
    }
  }
}
function drawViz(ctx, t, D){
  const st = S.style;
  if(st.viz && audioOn()){
    const n = 41, w = 620, x0 = W/2 - w/2, y = 1300, bw = (w/n)*0.5;
    let data = null; if(P && P.analyser){ P.analyser.getByteFrequencyData(P.freq); data = P.freq; } else if(X && X.viz) data = X.viz;
    ctx.fillStyle = st.accent;
    for(let i=0;i<n;i++){
      const j = Math.abs(i - (n-1)/2) / ((n-1)/2);
      let v = data ? data[Math.min(data.length-1, Math.floor(Math.pow(j,1.4) * data.length * 0.55) + 1)] / 255 : 0.12 + 0.06*Math.cos(i*0.9);
      v = v * (1 - j*0.35);
      const h = 6 + v * 92;
      ctx.globalAlpha = 0.35 + 0.5*(1-j); rr(ctx, x0 + i*(w/n) + (w/n - bw)/2, y - h/2, bw, h, bw/2);
    }
    ctx.globalAlpha = 1;
  }
  if(st.progress && D > 0){
    const y = 1364, x0 = W/2 - 250, w = 500;
    ctx.globalAlpha = 0.22; ctx.fillStyle = isDark(st.textColor) ? '#000' : '#fff'; rr(ctx, x0, y, w, 4, 2);
    ctx.globalAlpha = 0.95; ctx.fillStyle = st.accent; rr(ctx, x0, y, Math.max(4, w*clamp01(t/D)), 4, 2);
    ctx.globalAlpha = 1;
  }
}
function render(t){
  const ctx = CTX, sc = cv.width / W, D = totalDur();
  ctx.setTransform(sc,0,0,sc,0,0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  drawBg(ctx, t, D);
  if(S.style.overlay > 0){ ctx.fillStyle = `rgba(0,0,0,${S.style.overlay})`; ctx.fillRect(0,0,W,H); }
  ctx.drawImage(vignette(), 0, 0);
  if(C.header) ctx.drawImage(C.header, 0, 150);
  drawVerses(ctx, t, D);
  drawViz(ctx, t, D);
  if(C.footer) ctx.drawImage(C.footer, 0, 1392);
}
function showMsg(m){ const el = $('cvMsg'); el.textContent = m; el.hidden = false; }
function hideMsg(){ $('cvMsg').hidden = true; }

/* ---------- Lecture / enregistrement ---------- */
let P = null;
function currentT(){ return parseFloat($('scrub').value) || 0; }
function syncScrub(){ const D = totalDur(), sc = $('scrub'); sc.max = D.toFixed(2); if(currentT() > D) sc.value = Math.min(1, D).toFixed(2); $('tDur').textContent = fmt(D); $('tCur').textContent = fmt(currentT()); }
function pickMime(){
  if(!window.MediaRecorder) return '';
  const list = ['video/mp4;codecs=avc1.640028,mp4a.40.2','video/mp4;codecs=avc1.4D4028,mp4a.40.2','video/mp4;codecs=avc1,mp4a','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];
  for(const m of list){ try { if(MediaRecorder.isTypeSupported(m)) return m; } catch(e){} }
  return '';
}
async function startPlay(mode){
  if(P) stopPlay(true);
  if(!S.verses.length){ toast("Choisis d'abord tes versets (étape 1)."); return; }
  const rv = $('resultVideo'); if(rv && !rv.paused) rv.pause();
  const ctx = await wakeAudio();
  const D = totalDur();
  const offset = mode === 'preview' ? (currentT() >= D - 0.3 ? 0 : currentT()) : 0;
  P = {mode, D, offset, cancelled:false};
  const when = ctx.currentTime + 0.15;
  if(audioOn()){
    const src = ctx.createBufferSource(); src.buffer = S.buffer;
    const gain = ctx.createGain(), an = ctx.createAnalyser(); an.fftSize = 256; an.smoothingTimeConstant = 0.8;
    const endAt = when + Math.max(0.05, S.buffer.duration - offset);
    gain.gain.setValueAtTime(0, when); gain.gain.linearRampToValueAtTime(1, when + 0.06);
    gain.gain.setValueAtTime(1, Math.max(when + 0.07, endAt - 0.3)); gain.gain.linearRampToValueAtTime(0, endAt);
    src.connect(gain); gain.connect(an);
    if(!(mode === 'record' && S.muteMonitor)) gain.connect(ctx.destination);
    if(offset < S.buffer.duration) src.start(when, offset);
    P.src = src; P.gain = gain; P.analyser = an; P.freq = new Uint8Array(an.frequencyBinCount);
  }
  if(mode === 'record'){
    const mime = pickMime();
    if(!mime || !cv.captureStream){ stopPlay(true); toast("Ce navigateur ne sait pas enregistrer de vidéo. Ouvre la page dans Chrome ou Safari à jour."); return; }
    const vs = cv.captureStream(30), dest = ctx.createMediaStreamDestination();
    if(P.gain) P.gain.connect(dest);
    const ms = new MediaStream([...vs.getVideoTracks(), ...dest.stream.getAudioTracks()]);
    let rec;
    try { rec = new MediaRecorder(ms, {mimeType:mime, videoBitsPerSecond: S.res === 1080 ? 8000000 : 5000000, audioBitsPerSecond:192000}); }
    catch(e){ try { rec = new MediaRecorder(ms); } catch(e2){ stopPlay(true); toast("L'enregistrement vidéo a été refusé par le navigateur."); return; } }
    P.rec = rec; P.chunks = []; P.mime = rec.mimeType || mime; P.streams = [vs, dest.stream];
    const keep = P;
    rec.ondataavailable = e => { if(e.data && e.data.size) keep.chunks.push(e.data); };
    rec.onstop = () => finishRecord(keep);
    rec.start(500);
    try { if(navigator.wakeLock) keep.wake = await navigator.wakeLock.request('screen'); } catch(e){}
  }
  if(S.style.bg === 'video' && S.media.video){ const v = S.media.video; try { v.currentTime = v.duration ? offset % v.duration : 0; } catch(e){} v.play().catch(() => {}); }
  P.t0 = when - offset;
  setPlayingUI(true);
  P.raf = requestAnimationFrame(loop);
}
function loop(){
  if(!P) return;
  if(P.clock0 === undefined){ P.clock0 = ac().currentTime; P.wall0 = performance.now(); }
  if(performance.now() - P.wall0 > 2500 && ac().currentTime === P.clock0){
    const mode = P.mode; stopPlay(true);
    toast(mode === 'record' ? "Le son du téléphone est bloqué, l'enregistrement ne peut pas démarrer. Touche « Aperçu » une fois, puis relance « Créer la vidéo »." : "Le son du téléphone est bloqué. Retouche « Aperçu ».", 7000);
    return;
  }
  const t = Math.max(0, ac().currentTime - P.t0);
  render(Math.min(t, P.D));
  $('scrub').value = Math.min(t, P.D).toFixed(2); $('tCur').textContent = fmt(t);
  if(P.mode === 'record'){ const f = clamp01(t / P.D); $('progBar').style.width = (f*100).toFixed(1) + '%'; $('progText').textContent = 'Enregistrement en direct : ' + fmt(t) + ' / ' + fmt(P.D) + ". Garde l'écran allumé et reste sur cette page."; }
  if(t >= P.D){ endPlay(); return; }
  P.raf = requestAnimationFrame(loop);
}
function endPlay(){
  const p = P; if(!p) return;
  if(p.mode === 'tap') finishTap();
  stopPlay(false);
}
function stopPlay(cancel){
  const p = P; if(!p) return; P = null;
  cancelAnimationFrame(p.raf);
  try { p.src && p.src.stop(); } catch(e){}
  try { p.gain && p.gain.disconnect(); } catch(e){}
  if(S.media.video) S.media.video.pause();
  if(p.rec){ p.cancelled = !!cancel; if(p.rec.state !== 'inactive') p.rec.stop(); }
  try { p.wake && p.wake.release(); } catch(e){}
  if(p.mode === 'tap'){ $('btnTap').hidden = true; if(cancel) finishTap(p); }
  setPlayingUI(false);
  if(p.mode !== 'record'){ $('scrub').value = Math.min(currentT(), totalDur()).toFixed(2); render(currentT()); }
}
function setPlayingUI(on){
  const rec = on && P && P.mode === 'record';
  $('btnPlay').textContent = on ? '■ Stop' : '▶ Aperçu';
  $('btnRecord').disabled = rec; $('btnCancel').hidden = !rec; $('progBox').hidden = !rec && !$('progBox').dataset.keep;
  $('scrub').disabled = on;
  document.querySelectorAll('#tab-versets select, #tab-versets input, #audioMode button, #btnAuto, #btnTapStart').forEach(el => el.disabled = on);
}
function finishRecord(p){
  p.streams && p.streams.forEach(s => s.getTracks().forEach(tr => tr.stop()));
  $('progBox').hidden = true;
  if(p.cancelled){ toast('Export annulé.'); return; }
  if(p.hidden){ toast("La vidéo s'est figée quand tu as quitté la page. Relance l'export en restant sur l'écran.", 6500); }
  const type = (p.mime || 'video/webm').split(';')[0];
  const blob = new Blob(p.chunks, {type});
  if(!blob.size){ toast("L'enregistrement est vide. Réessaie, ou passe en qualité 720."); return; }
  S.renderMode = 'enregistrement en direct';
  showResult(blob, type.includes('mp4') ? 'mp4' : 'webm', p.D);
}
async function checkResultAudio(blob){
  try {
    const b = await decode(await blob.arrayBuffer()); let peak = 0;
    for(let c=0;c<b.numberOfChannels;c++){ const d = b.getChannelData(c); for(let i=0;i<d.length;i+=64) peak = Math.max(peak, Math.abs(d[i])); }
    if(peak > 0.002) $('resultMeta').textContent += ' · son ✓';
    else setStatus($('saveStatus'), "Attention : la vidéo est sortie sans son sur cet appareil. Dis-le à Claude en précisant ton téléphone.", 'bad');
  } catch(e){}
}
function showResult(blob, ext, D){
  if(S.result && S.result.url) URL.revokeObjectURL(S.result.url);
  const name = `tilawa_${String(S.surah).padStart(3,'0')}_${S.from}${S.to > S.from ? '-' + S.to : ''}.${ext}`;
  S.result = {blob, url: URL.createObjectURL(blob), ext, name};
  $('resultVideo').src = S.result.url;
  $('resultMeta').textContent = ext.toUpperCase() + ' · ' + (blob.size/1048576).toFixed(1).replace('.', ',') + ' Mo · ' + fmt(D) + (S.renderMode ? ' · ' + S.renderMode : '');
  S.renderMode = '';
  $('resultBox').hidden = false; setStatus($('saveStatus'), ext === 'webm' ? "Format WebM : si l'appli TikTok le refuse, passe par tiktok.com ou exporte depuis Safari/Chrome récent (MP4)." : '', ext === 'webm' ? 'warn' : '');
  updateSaveUI();
  if(audioOn() && blob.size < 80*1048576) checkResultAudio(blob);
  $('scrub').value = Math.min(1, totalDur()).toFixed(2); $('tCur').textContent = fmt(currentT()); render(currentT());
  $('resultBox').scrollIntoView({behavior:'smooth', block:'nearest'});
}
document.addEventListener('visibilitychange', () => { if(document.hidden && P && P.mode === 'record') P.hidden = true; });

/* ---------- Export rapide (WebCodecs + MP4) ---------- */
let X = null;
const IS_IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const yieldNow = (() => { const ch = new MessageChannel(), q = []; ch.port1.onmessage = () => { const f = q.shift(); if(f) f(); }; return () => new Promise(r => { q.push(r); ch.port2.postMessage(0); }); })();
/* Son en AAC dans un MP4 quand l'appareil sait l'encoder (ordinateur, Android) ;
   sinon son PCM sans compression dans un MOV : marche sur tous les iPhone, sans encodeur audio. */
async function fastConfig(){
  if(!('VideoEncoder' in window) || !('VideoFrame' in window)) return null;
  const w = cv.width, h = cv.height, bitrate = w >= 1080 ? 6000000 : 3500000;
  let video = null;
  for(const codec of ['avc1.640028','avc1.4D4028','avc1.42E028']){
    const cfg = {codec, width:w, height:h, bitrate, framerate:30, avc:{format:'avc'}};
    try { const r = await withTimeout(VideoEncoder.isConfigSupported(cfg), 3000, 'video'); if(r && r.supported){ video = cfg; break; } } catch(e){}
  }
  if(!video) return null;
  if(!audioOn()) return {video, audio:null, mov:false};
  const sr = S.buffer.sampleRate;
  const wantMov = S.fmt === 'mov' || (S.fmt === 'auto' && IS_IOS);
  if(!wantMov && 'AudioEncoder' in window && 'AudioData' in window){
    const enc = {codec:'mp4a.40.2', sampleRate:sr, numberOfChannels:1, bitrate:160000};
    try { const r = await withTimeout(AudioEncoder.isConfigSupported(enc), 3000, 'audio'); if(r && r.supported) return {video, audio:{codec:'aac', sampleRate:sr, channels:1, enc}, mov:false}; } catch(e){}
  }
  return {video, audio:{codec:'lpcm', sampleRate:sr, channels:1}, mov:true};
}
function fft(re, im){
  const n = re.length;
  for(let i=1, j=0; i<n; i++){ let bit = n >> 1; for(; j & bit; bit >>= 1) j ^= bit; j ^= bit; if(i < j){ let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
  for(let len=2; len<=n; len<<=1){
    const ang = -2*Math.PI/len, wr = Math.cos(ang), wi = Math.sin(ang);
    for(let i=0; i<n; i+=len){
      let cr = 1, ci = 0;
      for(let j=0; j<len/2; j++){
        const a = i+j, b = a+len/2, tr = re[b]*cr - im[b]*ci, ti = re[b]*ci + im[b]*cr;
        re[b] = re[a]-tr; im[b] = im[a]-ti; re[a] += tr; im[a] += ti;
        const nr = cr*wr - ci*wi; ci = cr*wi + ci*wr; cr = nr;
      }
    }
  }
}
/* Spectre calculé hors temps réel, pour le visualiseur pendant le rendu rapide */
function makeSpectrum(buf){
  const sr = buf.sampleRate, n = 256, d0 = buf.getChannelData(0), d1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : null;
  const re = new Float32Array(n), im = new Float32Array(n), win = new Float32Array(n), prev = new Float32Array(n/2), out = new Uint8Array(n/2);
  for(let i=0;i<n;i++) win[i] = 0.5 - 0.5*Math.cos(2*Math.PI*i/(n-1));
  return function(t){
    const c = Math.floor(t*sr) - n/2;
    for(let i=0;i<n;i++){ const k = c + i; let x = (k >= 0 && k < d0.length) ? d0[k] : 0; if(d1 && k >= 0 && k < d1.length) x = (x + d1[k]) * 0.5; re[i] = x * win[i]; im[i] = 0; }
    fft(re, im);
    for(let i=0;i<n/2;i++){
      const mag = Math.sqrt(re[i]*re[i] + im[i]*im[i]) / n, sm = 0.65*prev[i] + 0.35*mag; prev[i] = sm;
      out[i] = clamp(Math.round((20*Math.log10(sm + 1e-12) + 100) / 70 * 255), 0, 255);
    }
    return out;
  };
}
/* Son final en mono : fondus d'entrée/sortie + 0,6 s de silence, comme à l'aperçu */
function processedMono(){
  const au = processedAudio(); if(au.ch === 1) return {sr:au.sr, data:au.data[0], frames:au.frames};
  const m = new Float32Array(au.frames), a = au.data[0], b = au.data[1]; for(let i=0;i<au.frames;i++) m[i] = (a[i] + b[i]) * 0.5;
  return {sr:au.sr, data:m, frames:au.frames};
}
function processedAudio(){
  const b = S.buffer, sr = b.sampleRate, ch = Math.min(2, b.numberOfChannels), len = b.length, tail = Math.round(0.6*sr), data = [];
  for(let c=0;c<ch;c++){ const d = new Float32Array(len + tail); d.set(b.getChannelData(c)); data.push(d); }
  const fi = Math.min(len, Math.round(0.06*sr)), fo = Math.min(len, Math.round(0.3*sr));
  for(const d of data){ for(let i=0;i<fi;i++) d[i] *= i/fi; for(let i=0;i<fo;i++) d[len-1-i] *= i/fo; }
  return {sr, ch, data, frames: len + tail};
}
function withTimeout(p, ms, label){ return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout ' + label)), ms))]); }
async function drain(enc, max){
  const t0 = performance.now();
  while(enc.encodeQueueSize > max){
    if(performance.now() - t0 > 6000) throw new Error('encodeur bloqué');
    await yieldNow();
  }
}
function seekVideo(v, t){
  return new Promise(r => {
    let ok = false; const done = () => { if(ok) return; ok = true; v.removeEventListener('seeked', done); r(); };
    v.addEventListener('seeked', done); try { v.currentTime = t; } catch(e){ done(); } setTimeout(done, 800);
  });
}
function setExportUI(on){
  $('btnRecord').disabled = on; $('btnCancel').hidden = !on; $('progBox').hidden = !on; $('btnPlay').disabled = on; $('scrub').disabled = on;
  document.querySelectorAll('#tab-versets select, #tab-versets input, #tab-versets button, #audioMode button, #btnAuto, #btnTapStart, #resGroup button').forEach(el => el.disabled = on);
}
/* Rendu image par image : plus rapide que le direct, durée exacte, marche même si la page n'est pas au premier plan */
async function fastExport(){
  const cfg = await fastConfig(); if(!cfg) return false;
  const D = totalDur(), fps = 30, N = Math.max(1, Math.ceil(D*fps));
  const job = X = {cancel:false, error:null, viz:null};
  setExportUI(true);
  try {
    const au = cfg.audio;
    const mux = new TilawaMux.Muxer({width:cfg.video.width, height:cfg.video.height, fps, mov:cfg.mov, audio: au ? {codec:au.codec, sampleRate:au.sampleRate, channels:1} : null});
    if(au){
      $('progText').textContent = 'Préparation du son…';
      const mono = processedMono();
      if(au.codec === 'aac'){
        const aenc = new AudioEncoder({output:(c, m) => { if(m && m.decoderConfig) mux.setAudioConfig(m.decoderConfig.description); const b = new Uint8Array(c.byteLength); c.copyTo(b); mux.addAudio(b); }, error:e => { job.error = e; }});
        aenc.configure(au.enc);
        for(let off=0; off<mono.frames && !job.error && !job.cancel; off+=4096){
          const n = Math.min(4096, mono.frames - off);
          const ad = new AudioData({format:'f32-planar', sampleRate:mono.sr, numberOfFrames:n, numberOfChannels:1, timestamp:Math.round(off*1e6/mono.sr), data:mono.data.slice(off, off+n)});
          aenc.encode(ad); ad.close();
          await drain(aenc, 16);
        }
        if(!job.cancel){ await aenc.flush(); }
        try { aenc.close(); } catch(e){}
        if(job.error || !mux.a.length){
          // L'encodeur AAC n'a rien donné : on bascule sur le son PCM (MOV), qui marche partout
          job.error = null; mux.o.audio = {codec:'lpcm', sampleRate:mono.sr, channels:1}; mux.o.mov = true; cfg.mov = true; au.codec = 'lpcm';
        }
      }
      if(au.codec === 'lpcm') mux.setPCM(TilawaMux.toInt16([mono.data], mono.frames));
    }
    const spec = au && S.style.viz ? makeSpectrum(S.buffer) : null;
    const venc = new VideoEncoder({output:(c, m) => { if(m && m.decoderConfig) mux.setVideoConfig(m.decoderConfig.description); const b = new Uint8Array(c.byteLength); c.copyTo(b); mux.addVideo(b, c.type === 'key', c.timestamp); }, error:e => { job.error = e; }});
    venc.configure(cfg.video);
    const vid = S.style.bg === 'video' && S.media.video ? S.media.video : null;
    // Fond vidéo : on le laisse jouer et on prend l'image du moment (chercher chaque image une à une est très lent)
    let vplay = false; const vc = {last: 0, loops: 0};
    if(vid){
      vid.pause(); await seekVideo(vid, 0); vid.loop = true; vid.playbackRate = 1;
      try { await withTimeout(vid.play(), 3000, 'video'); vplay = !vid.paused; } catch(e){ vplay = false; }
      if(!vplay) vid.pause();
    }
    for(let i=0; i<N; i++){
      if(job.cancel || job.error) break;
      const t = i / fps;
      if(vid && vplay){
        const w0 = performance.now();
        for(;;){
          const ct = vid.currentTime; if(ct + 0.05 < vc.last) vc.loops++; vc.last = ct;
          if(vc.loops * (vid.duration || 1) + ct >= t || vid.paused || performance.now() - w0 > 1500) break;
          await new Promise(r => setTimeout(r, 4));
        }
      } else if(vid) await seekVideo(vid, vid.duration ? t % vid.duration : 0);
      job.viz = spec ? spec(t) : null;
      render(t);
      const vf = new VideoFrame(cv, {timestamp: Math.round(i*1e6/fps), duration: Math.round(1e6/fps)});
      venc.encode(vf, {keyFrame: i % 60 === 0}); vf.close();
      await drain(venc, 4);
      if(i % 10 === 0){
        $('progBar').style.width = (i/N*100).toFixed(1) + '%';
        $('progText').textContent = 'Création de la vidéo : ' + Math.floor(i/N*100) + ' % (' + fmt(t) + ' sur ' + fmt(D) + ')';
        await yieldNow();
      }
    }
    if(vid) vid.pause();
    if(job.cancel){ try { venc.close(); } catch(e){} toast('Création annulée.'); return true; }
    if(job.error) throw job.error;
    await venc.flush(); venc.close();
    if(job.error) throw job.error;
    const blob = mux.finalize();
    S.renderMode = !au ? 'sans son' : au.codec === 'lpcm' ? 'son haute qualité (MOV)' : 'son AAC (MP4)';
    showResult(blob, cfg.mov ? 'mov' : 'mp4', D);
    return true;
  } catch(e){
    console.error(e);
    toast("La création rapide n'a pas marché sur cet appareil : passage à l'enregistrement en direct.", 5000);
    return false;
  } finally {
    X = null; setExportUI(false); render(currentT());
  }
}

/* ---------- Récitateur en ligne ---------- */
let recSeq = 0, CATALOG = null;
function currentReciter(){ return S.reciter || TilawaSources.EA[0]; }
function recBadge(rec){ return rec.source === 'everyayah' ? 'Synchro parfaite' : rec.exact ? 'Synchro exacte' : 'Synchro automatique'; }
async function buildReciter(){
  const seq = ++recSeq, rec = currentReciter();
  S.buffer = null; S.starts = []; S.recExact = false;
  updateReciterUI();
  if(!S.verses.length){ renderTimings(); syncScrub(); return; }
  if(S.manual){ setStatus($('syncStatus'), 'Le son du récitateur marche avec le texte chargé automatiquement, pas avec un texte collé.', 'warn'); renderTimings(); syncScrub(); return; }
  renderTimings(); syncScrub(); render(currentT());
  const label = 'Chargement de la récitation de ' + rec.name + '…';
  setStatus($('syncStatus'), label); showMsg('Chargement du son…');
  const ctx = {decode, sliceBuffer, concatBuffers, speechBounds, progress: f => { if(seq === recSeq) setStatus($('syncStatus'), label + ' ' + Math.round(f*100) + ' %'); }};
  const weights = {all: S.chapter && S.chapter.surah === S.surah ? S.chapter.verses.map(v => Math.max(4, bare(v.ar).length)) : []};
  try {
    const r = await TilawaSources.build(rec, S.surah, S.verses, ctx, weights);
    if(seq !== recSeq) return;
    if(r.approx && r.est){ useApproxWindow(rec, r); return; }
    S.buffer = r.buffer;
    if(r.dropBasmala && S.verses[0] && S.verses[0].basmala){ S.verses = S.verses.slice(1); renderVerseList(); rebuild(); }
    if(S.style.reciterAuto || !(S.style.reciter || '').trim()){ S.style.reciter = rec.name; S.style.reciterAuto = true; $('inReciter').value = rec.name; buildFooter(); store(); }
    if(r.starts && r.starts.length === S.verses.length){
      S.recExact = true;
      setStarts(r.starts, 'Récitation de ' + rec.name + ' prête : ' + fmt(S.buffer.duration) + ', synchro exacte.' + (r.dropBasmala ? ' Ce récitateur ne lit pas la Basmala au début de cette sourate : elle est retirée.' : ''), 'good');
    } else {
      runDetect(true);
      setStatus($('syncStatus'), 'Récitation prête (' + fmt(S.buffer.duration) + '). Versets placés automatiquement sur les pauses' + (r.approx ? ', passage repéré approximativement dans la sourate' : '') + ' : vérifie à l’aperçu et utilise « Synchroniser au doigt » si un verset tombe mal.', 'warn');
    }
    hideMsg(); updateCaption(); updateExportInfo(); render(currentT());
  } catch(e){
    if(seq !== recSeq) return;
    console.error(e);
    const msg = e && e.code === 'absent' ? rec.name + ' n’a pas enregistré cette sourate. Choisis un autre récitateur.'
      : e && e.status === 404 ? 'Ce passage n’est pas disponible pour ' + rec.name + '. Choisis un autre récitateur.'
      : 'Le son n’a pas pu être chargé. Vérifie ta connexion, puis rechoisis le récitateur.';
    setStatus($('syncStatus'), msg, 'bad'); showMsg(msg);
    renderTimings(); syncScrub(); render(currentT());
  }
}
/* Récitateur sans minutage, passage au milieu d'une sourate : on charge un extrait un peu plus large
   dans « Mon fichier » pour régler le début et la fin à l'oreille. */
function useApproxWindow(rec, r){
  S.srcBuffer = r.buffer; S.fileName = rec.name; S.everyayah = false; S.approxFrom = true;
  const pl = $('srcPlayer'); if(pl.src) URL.revokeObjectURL(pl.src); pl.src = URL.createObjectURL(wavBlob(r.buffer, 16000)); pl.hidden = false;
  $('inStart').value = round1(r.est.a); $('inEnd').value = round1(Math.max(r.est.a + 1, r.est.b));
  $('trimBox').hidden = false;
  setStatus($('singleName'), rec.name + ' : extrait de ' + fmt(r.buffer.duration) + ' autour du passage.', 'warn');
  if(S.style.reciterAuto || !(S.style.reciter || '').trim()){ S.style.reciter = rec.name; S.style.reciterAuto = true; $('inReciter').value = rec.name; buildFooter(); }
  setAudioMode('single');
  setStatus($('syncStatus'), rec.name + ' n’a pas de minutage officiel : écoute l’extrait, place le début et la fin du passage avec « ⌖ ici », puis vérifie la synchro (au doigt si besoin). Ou choisis un récitateur « synchro exacte ».', 'warn');
  hideMsg(); openStudio('audio'); updateCaption();
  toast('Règle le début et la fin du passage à l’étape 2 « Audio ».', 6000);
}
function wavBlob(b, rate){
  const src = b.getChannelData(0), k = b.sampleRate / rate, n = Math.floor(src.length / k), out = new DataView(new ArrayBuffer(44 + n * 2));
  const w = (o, str) => { for(let i=0;i<str.length;i++) out.setUint8(o + i, str.charCodeAt(i)); };
  w(0, 'RIFF'); out.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt '); out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 1, true);
  out.setUint32(24, rate, true); out.setUint32(28, rate * 2, true); out.setUint16(32, 2, true); out.setUint16(34, 16, true); w(36, 'data'); out.setUint32(40, n * 2, true);
  for(let i=0;i<n;i++){ const a = Math.floor(i * k), z = Math.max(a + 1, Math.floor((i + 1) * k)); let sum = 0; for(let j=a;j<z;j++) sum += src[j]; let x = sum / (z - a); x = x < -1 ? -1 : x > 1 ? 1 : x; out.setInt16(44 + i * 2, x < 0 ? x * 0x8000 : x * 0x7FFF, true); }
  return new Blob([out.buffer], {type:'audio/wav'});
}
function updateReciterUI(){
  const rec = currentReciter();
  for(const id of ['homeRec', 'audRec']){ const el = $(id); if(el) el.textContent = rec.name; }
  const meta = recBadge(rec) + (rec.style ? ' · ' + rec.style : '');
  for(const id of ['homeRecMeta', 'audRecMeta']){ const el = $(id); if(el) el.textContent = meta; }
  document.querySelectorAll('.lib-card .rc').forEach(el => el.textContent = rec.name);
}
/* Choix du récitateur */
const fold = x => String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9؀-ۿ]/g, '');
let pickerFrom = null;
async function openPicker(){
  pickerFrom = document.activeElement;
  $('picker').hidden = false; document.body.classList.add('noscroll');
  $('pkSearch').value = ''; renderPicker();
  setTimeout(() => $('pkSearch').focus({preventScroll:true}), 50);
  if(!CATALOG){
    setStatus($('pkStatus'), 'Chargement de la liste complète des récitateurs…');
    try { CATALOG = await TilawaSources.loadCatalog(); setStatus($('pkStatus'), CATALOG.length + ' récitations disponibles.'); }
    catch(e){ console.error(e); setStatus($('pkStatus'), 'La liste complète n’a pas pu être chargée (connexion ?). Les récitateurs « synchro parfaite » restent disponibles.', 'warn'); }
    renderPicker();
  }
}
function closePicker(){ $('picker').hidden = true; document.body.classList.remove('noscroll'); if(pickerFrom && pickerFrom.focus) pickerFrom.focus({preventScroll:true}); }
function pkItem(rec){
  const b = document.createElement('button'); b.type = 'button'; b.className = 'pk-item'; b.setAttribute('aria-pressed', String(currentReciter().id === rec.id));
  const n = document.createElement('span'); n.className = 'nm'; n.textContent = rec.name;
  const m = document.createElement('span'); m.className = 'mt'; m.textContent = rec.style || '';
  const g = document.createElement('span'); g.className = 'pill ' + (rec.exact ? 'ok' : 'warn'); g.textContent = recBadge(rec);
  b.append(n, g, m); b.onclick = () => pickReciter(rec); return b;
}
function renderPicker(){
  const q = fold($('pkSearch').value), all = $('pkAll').checked, box = $('pkList'); box.textContent = '';
  const match = r => !q || fold(r.name).includes(q) || fold(r.style).includes(q);
  const hafs = r => all || /hafs|حفص/i.test(r.style || '') || !r.style;
  const sec = (title, list, hint) => {
    if(!list.length) return;
    const h = document.createElement('h3'); h.textContent = title; box.append(h);
    if(hint){ const p = document.createElement('p'); p.className = 'hint'; p.textContent = hint; box.append(p); }
    const ul = document.createElement('div'); ul.className = 'pk-group'; list.slice(0, 400).forEach(r => ul.append(pkItem(r))); box.append(ul);
  };
  sec('Synchro parfaite', TilawaSources.EA.filter(match), 'Un fichier par verset : le texte tombe pile avec la voix.');
  if(CATALOG){
    const list = CATALOG.filter(r => match(r) && hafs(r));
    sec('Populaires', list.filter(r => TilawaSources.isPopular(r.name)));
    sec('Tous les récitateurs (A à Z)', list, '« Synchro exacte » : minutage officiel des versets. « Synchro automatique » : versets placés sur les pauses, à vérifier.');
  }
  if(!box.children.length){ const p = document.createElement('p'); p.className = 'status'; p.textContent = 'Aucun récitateur ne correspond.'; box.append(p); }
}
function pickReciter(rec){
  S.reciter = rec; store(); closePicker(); updateReciterUI();
  if(S.audioMode !== 'reciter') setAudioMode('reciter'); else if(!$('studio').hidden) buildReciter();
  else S.needBuild = true;
  toast('Récitateur : ' + rec.name);
}

/* ---------- Synchronisation ---------- */
function setStarts(arr, msg, kind){ S.starts = arr; renderTimings(); syncScrub(); if(!P) render(currentT()); if(msg) setStatus($('syncStatus'), msg, kind); }
function runDetect(quiet){
  if(!S.buffer || !S.verses.length) return;
  const N = S.verses.length, st = detectStarts(S.buffer, N);
  if(st) setStarts(st, N > 1 ? 'Versets placés sur les ' + (N-1) + ' plus longues pauses. Vérifie à l’aperçu, corrige un temps si besoin.' : 'Un seul verset : il couvre tout le son.', 'good');
  else setStarts(weightedStarts(S.buffer.duration, 0, 0), quiet ? 'Pas assez de pauses nettes : temps estimés selon la longueur des versets. Utilise « Synchroniser au doigt » pour un calage précis.' : 'Pas assez de pauses pour ' + N + ' versets. Ajuste Début/Fin ou synchronise au doigt.', 'warn');
}
function multiStarts(){
  const N = S.verses.length, d = S.multiDurs, st = []; let a = 0;
  for(let i=0;i<N;i++){ st.push(i < d.length ? round1(a) : Infinity); if(i < d.length) a += d[i]; }
  const hasB = S.verses[0] && S.verses[0].basmala;
  let msg = d.length + ' fichiers pour ' + N + (hasB ? ' passages (Basmala + versets).' : ' versets.'), kind = 'good';
  if(hasB && d.length === N - 1){ msg = 'Il manque la Basmala : ajoute aussi le fichier 001001.mp3 (il se range en premier), ou décoche « Commencer par la Basmala » à l\u2019étape 1.'; kind = 'warn'; setStarts(st, msg, kind); return; }
  if(d.length < N){ msg += ' Il manque ' + (N - d.length) + ' fichier(s) : les derniers versets ne s’afficheront pas.'; kind = 'warn'; }
  else if(d.length > N){ msg += ' Les fichiers en trop prolongent le dernier verset.'; kind = 'warn'; }
  setStarts(st, msg, kind);
}
function applyTrim(){
  if(!S.srcBuffer) return;
  const dur = S.srcBuffer.duration;
  let a = clamp(parseFloat($('inStart').value) || 0, 0, dur - 0.2), z = clamp(parseFloat($('inEnd').value) || dur, a + 0.2, dur);
  $('inStart').value = round1(a); $('inEnd').value = round1(z);
  S.trim = {start:a, end:z};
  if(S.audioMode !== 'single') return;
  S.buffer = sliceBuffer(S.srcBuffer, a, z);
  runDetect(true);
}
function startTap(){
  if(!S.buffer){ toast("Importe d'abord ta récitation."); return; }
  if(S.verses.length < 2){ toast('Un seul verset : rien à synchroniser.'); return; }
  $('scrub').value = 0;
  S.starts = [0];
  startPlay('tap').then(() => { if(P && P.mode === 'tap'){ $('btnTap').hidden = false; updateTapLabel(); } });
  setStatus($('syncStatus'), 'Écoute et touche le gros bouton à chaque nouveau verset.', '');
}
function updateTapLabel(){ const k = S.starts.length; $('btnTap').textContent = k < S.verses.length ? 'Touche au début : ' + verseLabel(S.verses[k]) + '  (' + (k+1) + '/' + S.verses.length + ')' : 'Tous les versets sont placés'; }
function tap(){
  if(!P || P.mode !== 'tap') return;
  if(S.starts.length >= S.verses.length) return;
  const t = round1(Math.max(S.starts[S.starts.length-1] + 0.2, ac().currentTime - P.t0 - 0.05));
  S.starts.push(t); updateTapLabel(); renderTimings();
}
function finishTap(){
  const N = S.verses.length;
  if(S.starts.length < N && S.buffer){
    const last = S.starts[S.starts.length-1] || 0, rest = weightedStarts(S.buffer.duration, S.starts.length, last + 1.5);
    S.starts = S.starts.concat(rest);
    setStatus($('syncStatus'), 'Synchro interrompue : les versets restants sont estimés. Relance si besoin.', 'warn');
  } else setStatus($('syncStatus'), 'Synchro au doigt enregistrée. Ajuste un temps au dixième si besoin.', 'good');
  renderTimings();
}
function renderTimings(){
  const ol = $('timingList'); ol.textContent = '';
  const useAudio = audioOn();
  $('timingTitle').textContent = useAudio ? 'Début de chaque verset (secondes)' : 'Durée de chaque verset (secondes)';
  S.verses.forEach((v,i) => {
    const li = document.createElement('li');
    const b = document.createElement('button'); b.type = 'button'; b.className = 'vn'; b.textContent = v.basmala ? 'B' : 'v.' + v.n; b.title = 'Voir ' + verseLabel(v);
    b.onclick = () => { if(P) return; const T = times(); const s = T[i].start; if(isFinite(s)){ $('scrub').value = Math.min(totalDur(), s + 0.6).toFixed(2); $('tCur').textContent = fmt(currentT()); render(currentT()); } };
    const sn = document.createElement('span'); sn.className = 'snip'; sn.lang = 'ar'; sn.textContent = v.ar.split(/\s+/).slice(0,6).join(' ');
    const inp = document.createElement('input'); inp.type = 'number'; inp.inputMode = 'decimal'; inp.step = '0.1'; inp.min = '0'; inp.id = 'tm' + i; inp.setAttribute('aria-label', (useAudio ? 'Début : ' : 'Durée : ') + verseLabel(v));
    if(useAudio){
      const s = S.starts[i]; inp.value = isFinite(s) ? s : ''; if(i === 0){ inp.disabled = true; inp.value = 0; }
      inp.onchange = () => { let x = parseFloat(inp.value); if(!isFinite(x)) return; const prev = i > 0 ? S.starts[i-1] : 0, next = S.starts[i+1]; x = clamp(x, prev + 0.2, isFinite(next) ? next - 0.2 : totalDur() - 0.2); S.starts[i] = round1(x); inp.value = S.starts[i]; render(currentT()); };
    } else {
      inp.value = S.durs[i]; inp.min = '1';
      inp.onchange = () => { const x = parseFloat(inp.value); if(isFinite(x) && x >= 1){ S.durs[i] = round1(Math.min(x, 120)); inp.value = S.durs[i]; syncScrub(); render(currentT()); updateCaption(); } };
    }
    li.append(b, sn, inp); ol.append(li);
  });
}

/* ---------- Import audio ---------- */
async function onSingleFile(file){
  if(!file) return;
  setStatus($('singleName'), 'Lecture de « ' + file.name + ' »…');
  try {
    const buf = await decode(await file.arrayBuffer());
    S.srcBuffer = buf; S.fileName = file.name; S.everyayah = /^\d{6}\.mp3$/i.test(file.name);
    const pl = $('srcPlayer'); if(pl.src) URL.revokeObjectURL(pl.src); pl.src = URL.createObjectURL(file); pl.hidden = false;
    const sb = speechBounds(buf);
    $('inStart').value = round1(Math.max(0, sb.first - 0.15)); $('inEnd').value = round1(Math.min(buf.duration, sb.last + 0.4));
    $('trimBox').hidden = false;
    setStatus($('singleName'), file.name + ' · ' + fmt(buf.duration), 'good');
    applyTrim();
    updateCaption();
  } catch(e){
    setStatus($('singleName'), "Ce fichier n'a pas pu être lu. Essaie un MP3 ou un M4A.", 'bad');
  }
}
async function onMultiFiles(files){
  const list = Array.from(files || []).sort((a,b) => a.name.localeCompare(b.name, undefined, {numeric:true}));
  if(!list.length) return;
  S.everyayah = list.every(f => /^\d{6}\.mp3$/i.test(f.name));
  setStatus($('syncStatus'), 'Lecture de ' + list.length + ' fichiers…');
  try {
    const bufs = [];
    for(const f of list){ const b = await decode(await f.arrayBuffer()); const sb = speechBounds(b); bufs.push(sliceBuffer(b, Math.max(0, sb.first - 0.1), Math.min(b.duration, sb.last + 0.35))); }
    S.multiDurs = bufs.map(b => b.duration);
    S.multiBuffer = concatBuffers(bufs);
    if(S.audioMode === 'multi') S.buffer = S.multiBuffer;
    multiStarts(); updateCaption();
  } catch(e){ setStatus($('syncStatus'), "Un des fichiers n'a pas pu être lu. Utilise des MP3.", 'bad'); }
}
function setAudioMode(m){
  if(P) stopPlay(true);
  S.audioMode = m;
  document.querySelectorAll('#audioMode button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.mode === m)));
  $('am-none').hidden = m !== 'none'; $('am-single').hidden = m !== 'single'; $('am-multi').hidden = m !== 'multi'; $('am-reciter').hidden = m !== 'reciter';
  S.buffer = null; S.starts = [];
  if(m === 'single' && S.srcBuffer) applyTrim();
  else if(m === 'multi' && S.multiBuffer){ S.buffer = S.multiBuffer; multiStarts(); }
  else if(m === 'reciter') buildReciter();
  else setStatus($('syncStatus'), '');
  renderTimings(); syncScrub(); render(currentT()); updateExportInfo();
}

/* ---------- Style ---------- */
function buildChips(){
  const mkChips = (el, list, key) => { el.textContent = ''; for(const [hex, name] of list){ const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.setAttribute('role','radio'); b.dataset.v = hex; b.setAttribute('aria-checked', String(S.style[key] === hex)); const i = document.createElement('i'); i.style.background = hex; b.append(i, document.createTextNode(name)); b.onclick = () => { S.style[key] = hex; el.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-checked', String(c.dataset.v === hex))); styleChanged(); }; el.append(b); } };
  mkChips($('tcGroup'), TEXT_COLORS, 'textColor'); mkChips($('acGroup'), ACCENTS, 'accent');
}
function setBg(bg){
  S.style.bg = bg;
  markBg(); markMedia();
  if(S.media.video){ if(bg === 'video') { S.media.video.currentTime = 0; } else S.media.video.pause(); }
  if(!P) render(currentT()); store();
}
function markBg(){
  document.querySelectorAll('#bgGrid .bgt, #bgOwn .bgt').forEach(b => b.setAttribute('aria-checked', String(b.dataset.bg === S.style.bg)));
}
let bgFilter = null;
const thumbCache = new Map();
function buildBgPicker(){
  if(!bgFilter) bgFilter = (TilawaScenes.resolve(S.style.bg).scene || TilawaScenes.SCENES[0]).id;
  const chips = $('sceneChips'); chips.textContent = '';
  TilawaScenes.SCENES.forEach(sc => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.setAttribute('role', 'radio'); b.dataset.v = sc.id; b.textContent = sc.name;
    b.setAttribute('aria-checked', String(bgFilter === sc.id));
    b.onclick = () => { bgFilter = sc.id; chips.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-checked', String(c.dataset.v === sc.id))); renderBgGrid(); };
    chips.append(b);
  });
  renderBgGrid();
  const on = chips.querySelector('[aria-checked=true]'); if(on) chips.scrollLeft = on.offsetLeft - 16;
}
let thumbJob = 0;
function renderBgGrid(){
  const grid = $('bgGrid'); grid.textContent = '';
  const list = TilawaScenes.ALL.filter(b => b.scene.id === bgFilter), todo = [];
  for(const b of list){
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'bgt'; btn.setAttribute('role', 'radio'); btn.dataset.bg = b.id; btn.setAttribute('aria-label', b.name);
    btn.setAttribute('aria-checked', String(S.style.bg === b.id));
    const img = document.createElement('img'); img.alt = ''; img.decoding = 'async'; btn.append(img);
    const l = document.createElement('span'); l.className = 'lab'; l.textContent = b.pal.name; btn.append(l);
    btn.onclick = () => setBg(b.id);
    grid.append(btn);
    if(thumbCache.has(b.id)) img.src = thumbCache.get(b.id); else todo.push([b.id, img]);
  }
  // Vignettes dessinées une par une, sans bloquer la page
  const job = ++thumbJob;
  const step = () => {
    if(job !== thumbJob || !todo.length) return;
    const [id, img] = todo.shift();
    try { const url = TilawaScenes.thumbURL(id, 135, 240, 2.5); thumbCache.set(id, url); img.src = url; } catch(e){ console.error(e); }
    setTimeout(step, 16);
  };
  step();
}
/* ---------- Fonds de la sourate : photos et vidéos Pexels ---------- */
const mediaCache = new Map(); let mediaSeq = 0, mediaQuery = '', mediaSurah = 0;
function renderSurahThemes(force){
  const su = S.surah; if(!force && mediaSurah === su) return; mediaSurah = su;
  $('smTitle').textContent = 'Fonds pour la sourate ' + SURAHS[su-1][0] + ' (' + SURAHS[su-1][1] + ')';
  const chips = $('smChips'); chips.textContent = '';
  const themes = TilawaThemes.forSurah(su);
  themes.forEach(([label, q]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.setAttribute('role', 'radio'); b.dataset.q = q; b.textContent = label;
    b.onclick = () => loadMedia(q, false); chips.append(b);
  });
  loadMedia(themes[0][1], false);
}
async function loadMedia(q, fr){
  mediaQuery = q;
  $('smChips').querySelectorAll('.chip').forEach(c => c.setAttribute('aria-checked', String(c.dataset.q === q)));
  const grid = $('smGrid'); grid.textContent = '';
  setStatus($('smStatus'), 'Recherche de fonds…');
  const seq = ++mediaSeq, key = (fr ? 'fr:' : '') + q;
  let data = mediaCache.get(key);
  if(!data){
    try { const r = await fetch('/api/media?q=' + encodeURIComponent(q) + (fr ? '&lang=fr' : '')); data = await r.json(); if(r.ok) mediaCache.set(key, data); }
    catch(e){ data = {error:'network'}; }
  }
  if(seq !== mediaSeq) return;
  if(data.error === 'no_key' || data.error === 'bad_key'){ setStatus($('smStatus'), data.error === 'bad_key' ? 'La clé Pixabay enregistrée dans Vercel ne marche pas : vérifie-la.' : 'Les photos et vidéos ne sont pas encore activées : la clé Pixabay manque dans les réglages Vercel. Les fonds animés plus bas marchent déjà.', 'warn'); return; }
  if(data.provider) $('smCredit').textContent = data.provider;
  if(data.error){ setStatus($('smStatus'), 'Les fonds n’ont pas pu être chargés. Vérifie ta connexion et réessaie.', 'bad'); return; }
  const items = [];
  const v = data.videos || [], p = data.photos || [];
  for(let i = 0; i < Math.max(v.length, p.length); i++){ if(v[i]) items.push(Object.assign({video:true}, v[i])); if(p[i]) items.push(p[i]); if(p[i + 9]) items.push(p[i + 9]); }
  const seen = new Set(), list = items.filter(it => !seen.has(it.id) && seen.add(it.id));
  if(!list.length){ setStatus($('smStatus'), 'Aucun fond trouvé pour ce thème. Essaie un autre mot.', 'warn'); return; }
  setStatus($('smStatus'), v.length + ' vidéo' + (v.length > 1 ? 's' : '') + ' et ' + p.length + ' photo' + (p.length > 1 ? 's' : '') + '. Touche un fond pour l’essayer.');
  for(const it of list){
    const b = document.createElement('button'); b.type = 'button'; b.className = 'bgt'; b.setAttribute('role', 'radio'); b.dataset.id = it.id;
    b.setAttribute('aria-label', (it.video ? 'Vidéo' : 'Photo') + (it.alt ? ' : ' + it.alt : ''));
    b.setAttribute('aria-checked', 'false'); b.style.background = it.color || '#111829';
    const img = document.createElement('img'); img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.referrerPolicy = 'no-referrer'; img.src = it.thumb; b.append(img);
    if(it.video){ const t = document.createElement('span'); t.className = 'badge'; t.textContent = '▶ ' + Math.round(it.dur || 0) + ' s'; b.append(t); }
    b.onclick = () => useMedia(it, b);
    grid.append(b);
  }
  markMedia();
}
async function useMedia(it, btn){
  if(X || (P && P.mode === 'record')){ toast('Une vidéo est en cours de création.'); return; }
  btn.classList.add('loading');
  toast(it.video ? 'Chargement de la vidéo de fond…' : 'Chargement de la photo…', 2500);
  try {
    const r = await TilawaSources.smartFetch(it.video ? it.file : it.full);
    const blob = await r.blob();
    const f = new File([blob], it.id + (it.video ? '.mp4' : '.jpg'), {type: blob.type || (it.video ? 'video/mp4' : 'image/jpeg')});
    S.mediaPick = it.id;
    if(it.video) onVideo(f); else onImage(f);
  } catch(e){ console.error(e); toast('Ce fond n’a pas pu être chargé. Essaie-en un autre.'); }
  finally { btn.classList.remove('loading'); }
}
function markMedia(){
  const on = S.style.bg === 'image' || S.style.bg === 'video';
  document.querySelectorAll('#smGrid .bgt').forEach(b => b.setAttribute('aria-checked', String(on && b.dataset.id === S.mediaPick)));
}
function styleChanged(){ store(); rebuild(); updateCaption(); }
function syncStyleInputs(){
  const st = S.style;
  $('rgOverlay').value = st.overlay; $('oOverlay').textContent = Math.round(st.overlay*100) + ' %';
  $('selFont').value = st.arFont; $('rgAr').value = st.arSize; $('oAr').textContent = st.arSize;
  $('rgTr').value = st.trSize; $('oTr').textContent = st.trSize;
  $('tgNum').checked = st.showNum; $('tgHeader').checked = st.header; $('tgViz').checked = st.viz; $('tgProg').checked = st.progress;
  $('inReciter').value = st.reciter; $('inHandle').value = st.handle; $('selLang').value = S.lang;
  markBg();
  document.querySelectorAll('#resGroup button').forEach(b => b.setAttribute('aria-checked', String(+b.dataset.res === S.res)));
}
async function onImage(file){
  if(!file) return;
  if(S.media.imgUrl) URL.revokeObjectURL(S.media.imgUrl);
  const url = URL.createObjectURL(file), img = new Image();
  img.onload = () => { S.media.img = img; S.media.imgUrl = url; $('ownImg').hidden = false; $('ownImg').style.backgroundImage = `url("${url}")`; if(S.style.overlay < 0.3){ S.style.overlay = 0.45; syncStyleInputs(); } setBg('image'); };
  img.onerror = () => toast("Cette image n'a pas pu être ouverte.");
  img.src = url;
}
function onVideo(file){
  if(!file) return;
  if(S.media.vidUrl) URL.revokeObjectURL(S.media.vidUrl);
  const url = URL.createObjectURL(file), v = document.createElement('video');
  v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline',''); v.preload = 'auto';
  v.onloadeddata = () => { S.media.video = v; S.media.vidUrl = url; if(S.style.overlay < 0.3){ S.style.overlay = 0.45; syncStyleInputs(); } setBg('video'); setTimeout(() => render(currentT()), 120); };
  v.onerror = () => toast("Cette vidéo n'a pas pu être ouverte.");
  v.src = url; v.load();
  if(S.media.video && S.media.video !== v && S.media.video.parentNode) S.media.video.remove();
  v.setAttribute('aria-hidden', 'true'); v.style.cssText = 'position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none';
  document.body.append(v);
  $('ownVid').hidden = false;
}

/* ---------- Export, téléchargement, légende ---------- */
function updateSaveUI(){
  const b = $('btnSave');
  if(!S.result){ b.hidden = true; return; }
  b.hidden = false;
  b.textContent = canShareFiles() ? 'Enregistrer / partager la vidéo' : 'Télécharger la vidéo';
}
function canShareFiles(){
  try { return !!(navigator.canShare && navigator.share && navigator.canShare({files:[new File([new Blob(['x'])], 'x.mp4', {type:'video/mp4'})]})); } catch(e){ return false; }
}
async function saveVideo(){
  if(!S.result) return;
  const f = new File([S.result.blob], S.result.name, {type: S.result.blob.type || 'video/mp4'});
  if(navigator.canShare && navigator.share){
    let ok = false; try { ok = navigator.canShare({files:[f]}); } catch(e){}
    if(ok){
      try { await navigator.share({files:[f], title:'Tilawa'}); setStatus($('saveStatus'), 'Choisis « Enregistrer la vidéo » pour la mettre dans ta galerie, ou envoie-la directement à TikTok.', 'good'); return; }
      catch(e){ if(e && e.name === 'AbortError') return; }
    }
  }
  const a = document.createElement('a'); a.href = S.result.url; a.download = S.result.name; document.body.append(a); a.click(); a.remove();
  setStatus($('saveStatus'), 'Vidéo téléchargée (' + S.result.name + ').', 'good');
}
let infoSeq = 0;
async function updateExportInfo(){
  const seq = ++infoSeq, D = totalDur(), n = S.verses.filter(v => !v.basmala).length, sound = audioOn() ? ', avec le son.' : ', sans son.';
  const cfg = await fastConfig().catch(() => null);
  if(seq !== infoSeq) return;
  const what = 'Vidéo de ' + fmt(D) + ' pour ' + n + ' verset' + (n > 1 ? 's' : '') + '. ';
  if(cfg){ $('expInfo').textContent = what + 'Création rapide en ' + (cfg.mov ? 'MOV (le format vidéo de l\u2019iPhone)' : 'MP4') + sound + ' Pas besoin d\u2019attendre toute la durée de la vidéo.'; return; }
  const m = pickMime(), fmtName = !m ? 'non pris en charge sur ce navigateur' : m.includes('mp4') ? 'MP4' : 'WebM';
  $('expInfo').textContent = what + 'Enregistrement en temps réel, format ' + fmtName + sound + ' Garde l\u2019écran allumé sur cette page pendant l\u2019export.';
}
function updateCaption(){
  const s = SURAHS[S.surah-1], ref = S.surah + ':' + S.from + (S.to > S.from ? '-' + S.to : '');
  const rec = (S.style.reciter||'').trim();
  const tag = s[0].toLowerCase().replace(/[^a-z]/g,'');
  const src = S.audioMode === 'reciter' ? (currentReciter().source === 'everyayah' ? 'everyayah.com' : 'mp3quran.net') : S.everyayah ? 'everyayah.com' : '';
  const credit = audioOn() && src ? '\nAudio : ' + src : '';
  $('caption').value = 'Sourate ' + s[0] + ' (' + ref + ')' + (rec ? ' · récitation : ' + rec : '') + credit + '\n\n#coran #quran #islam #recitation #' + tag + ' #muslim #fyp';
  updateExportInfo();
}

/* ---------- Bibliothèque ---------- */
const LIB = [
  {su:31, f:12, t:19, ar:'لقمان', ti:'Les conseils de Luqman à son fils'},
  {su:2, f:255, t:255, ar:'البقرة', ti:'Le Verset du Trône (Ayat al-Kursi)'},
  {su:25, f:63, t:77, ar:'الفرقان', ti:'Les serviteurs du Tout Miséricordieux'},
  {su:17, f:23, t:28, ar:'الإسراء', ti:'La bonté envers les parents'},
  {su:39, f:53, t:61, ar:'الزمر', ti:'Ne désespérez pas de la miséricorde d’Allah'},
  {su:2, f:284, t:286, ar:'البقرة', ti:'Les derniers versets de la Baqara'},
  {su:59, f:18, t:24, ar:'الحشر', ti:'Les plus beaux noms d’Allah'},
  {su:14, f:35, t:41, ar:'إبراهيم', ti:'Les invocations d’Ibrahim'},
  {su:49, f:10, t:13, ar:'الحجرات', ti:'Les croyants sont des frères'},
  {su:3, f:190, t:194, ar:'آل عمران', ti:'Les signes de la création'},
  {su:23, f:1, t:11, ar:'المؤمنون', ti:'La réussite des croyants'},
  {su:18, f:1, t:10, ar:'الكهف', ti:'Le début de la Caverne (Al-Kahf)'},
  {su:36, f:1, t:12, ar:'يس', ti:'Le début de Ya-Sin'},
  {su:93, f:1, t:11, ar:'الضحى', ti:'Ton Seigneur ne t’a pas abandonné'},
  {su:94, f:1, t:8, ar:'الشرح', ti:'Avec la difficulté vient la facilité'},
  {su:55, f:1, t:25, ar:'الرحمن', ti:'Lequel des bienfaits de votre Seigneur nierez-vous ?'},
  {su:67, f:1, t:14, ar:'الملك', ti:'Béni soit Celui qui détient la royauté'}
];
let pushedStudio = false;
function showView(v){
  const home = v === 'home';
  if(home && P && P.mode !== 'record') stopPlay(true);
  $('home').hidden = !home; $('studio').hidden = home; $('btnHome').hidden = home;
  window.scrollTo(0, 0);
  if(!home){ render(currentT()); if(S.needBuild){ S.needBuild = false; if(S.audioMode === 'reciter') buildReciter(); } }
}
function openStudio(tab){
  showView('studio');
  if(location.hash !== '#studio'){ try { history.pushState({v:'studio'}, '', '#studio'); pushedStudio = true; } catch(e){} }
  const b = $('t-' + (tab || 'versets')); if(b) b.click();
}
function goHome(){
  if(pushedStudio && location.hash === '#studio'){ pushedStudio = false; try { history.back(); return; } catch(e){} }
  try { if(location.hash) history.replaceState(null, '', location.pathname + location.search); } catch(e){}
  showView('home');
}
function openSelection(su, f, t){
  if(X || (P && P.mode === 'record')){ toast('Une vidéo est en cours de création : attends la fin ou annule-la.'); openStudio('export'); return; }
  S.surah = su; $('selSurah').value = su; $('inFrom').value = f; $('inTo').value = t;
  S.basmalaOn = true; $('tgBasmala').checked = true;
  S.needBuild = false;
  if(S.audioMode !== 'reciter') setAudioMode('reciter');
  openStudio('style');
  loadSelection();
}
function libCard(it){
  const li = document.createElement('li'), b = document.createElement('button');
  b.type = 'button'; b.className = 'lib-card';
  const s = SURAHS[it.su-1], full = it.f === 1 && it.t === s[2];
  const ti = document.createElement('span'); ti.className = 'ti'; ti.textContent = it.ti;
  const n = it.t - it.f + 1;
  const m1 = document.createElement('span'); m1.className = 'meta'; m1.textContent = s[0] + ' · ' + (full ? 'sourate complète' : n > 1 ? 'versets ' + it.f + '-' + it.t : 'verset ' + it.f);
  const m2 = document.createElement('span'); m2.className = 'meta rc'; m2.textContent = currentReciter().name;
  const ar = document.createElement('span'); ar.className = 'ar'; ar.lang = 'ar'; ar.textContent = it.ar;
  b.append(ti, ar, m1, m2);
  b.setAttribute('aria-label', it.ti + ', ' + m1.textContent);
  b.onclick = () => openSelection(it.su, it.f, it.t);
  li.append(b); return li;
}
function renderSurahList(){
  const q = fold($('libSearch').value), ol = $('surahList'); ol.textContent = ''; let n = 0;
  SURAHS.forEach((s, i) => {
    if(q && !(fold(s[0]).includes(q) || fold(s[1]).includes(q) || String(i+1) === q)) return;
    const li = document.createElement('li'), b = document.createElement('button'); b.type = 'button';
    const num = document.createElement('span'); num.className = 'n'; num.textContent = i + 1;
    const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = s[0];
    const mn = document.createElement('span'); mn.className = 'mn'; mn.textContent = s[1]; nm.append(mn);
    const vc = document.createElement('span'); vc.className = 'vc';
    vc.textContent = s[2] + ' versets';
    b.append(num, nm, vc); b.onclick = () => {
      let t = s[2];
      if(s[2] > 40){ t = 15; toast('Sourate longue : je t’ai mis les versets 1 à ' + t + '. Change la plage à l’étape 1 « Versets ».', 6000); }
      openSelection(i + 1, 1, t);
    };
    li.append(b); ol.append(li); n++;
  });
  $('surahNone').hidden = n > 0;
}
function initLibrary(){
  const ul = $('libList'); ul.textContent = ''; LIB.forEach(it => ul.append(libCard(it)));
  renderSurahList();
  $('libSearch').oninput = renderSurahList;
  $('btnImport').onclick = () => { if(X || (P && P.mode === 'record')){ toast('Une vidéo est en cours de création.'); return; } if(S.audioMode !== 'single') setAudioMode('single'); openStudio('audio'); };
  $('btnHome').onclick = goHome;
  for(const id of ['btnHomeRec', 'btnAudRec']) $(id).onclick = openPicker;
  $('pkClose').onclick = closePicker;
  $('picker').addEventListener('click', e => { if(e.target === $('picker')) closePicker(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !$('picker').hidden) closePicker(); });
  $('pkSearch').oninput = renderPicker; $('pkAll').onchange = renderPicker;
  updateReciterUI();
  window.addEventListener('popstate', () => showView(location.hash === '#studio' ? 'studio' : 'home'));
  showView(location.hash === '#studio' ? 'studio' : 'home');
}

/* ---------- Câblage ---------- */
function initUI(){
  const sel = $('selSurah');
  SURAHS.forEach((s,i) => { const o = document.createElement('option'); o.value = i+1; o.textContent = (i+1) + ' · ' + s[0] + ' · ' + s[1] + ' (' + s[2] + ' v.)'; sel.append(o); });
  sel.value = S.surah; $('inFrom').value = S.from; $('inTo').value = S.to;
  sel.onchange = () => { S.surah = +sel.value; const n = SURAHS[S.surah-1][2]; $('inFrom').value = 1; $('inTo').value = n; loadSelection(); };
  $('btnWhole').onclick = () => { const n = S.chapter && S.chapter.surah === S.surah ? S.chapter.verses.length : SURAHS[S.surah-1][2]; $('inFrom').value = 1; $('inTo').value = n; S.manual ? manualApply() : applyRange(); };
  $('inFrom').onchange = () => { if(+$('inTo').value < +$('inFrom').value) $('inTo').value = $('inFrom').value; S.manual ? manualApply() : applyRange(); };
  $('inTo').onchange = () => S.manual ? manualApply() : applyRange();
  $('selLang').onchange = () => { const prev = S.lang; S.lang = $('selLang').value; store(); if(!S.manual && ((prev === 'en') !== (S.lang === 'en'))) loadSelection(); else { renderVerseList(); rebuild(); } };
  $('btnManual').onclick = manualApply;
  $('tgBasmala').onchange = () => { S.basmalaOn = $('tgBasmala').checked; applyRange(); };

  document.querySelectorAll('.steps button').forEach(b => b.onclick = () => {
    document.querySelectorAll('.steps button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
    document.querySelectorAll('.tab').forEach(t => t.hidden = t.id !== 'tab-' + b.dataset.tab);
    if(b.dataset.tab === 'export') updateExportInfo();
    if(b.dataset.tab === 'style') renderSurahThemes();
  });

  document.querySelectorAll('#audioMode button').forEach(b => b.onclick = () => { if(b.dataset.mode !== 'single') S.approxFrom = false; setAudioMode(b.dataset.mode); });
  $('fileSingle').onchange = e => { S.approxFrom = false; onSingleFile(e.target.files[0]); };
  $('fileMulti').onchange = e => onMultiFiles(e.target.files);
  $('inStart').onchange = applyTrim; $('inEnd').onchange = applyTrim;
  $('btnSetStart').onclick = () => { $('inStart').value = round1($('srcPlayer').currentTime || 0); applyTrim(); };
  $('btnSetEnd').onclick = () => { $('inEnd').value = round1($('srcPlayer').currentTime || 0); applyTrim(); };
  $('btnAuto').onclick = () => runDetect(false);
  $('btnTapStart').onclick = () => { $('srcPlayer').pause(); startTap(); };
  $('btnTap').onclick = tap;
  $('btnRecTap').onclick = startTap;

  buildBgPicker();
  $('fileImg').onchange = e => { S.mediaPick = null; onImage(e.target.files[0]); };
  $('fileVid').onchange = e => { S.mediaPick = null; onVideo(e.target.files[0]); };
  $('smGo').onclick = () => { const q = $('smSearch').value.trim(); if(q) loadMedia(q, true); };
  $('smSearch').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); $('smGo').click(); } });
  $('ownImg').onclick = () => setBg('image'); $('ownVid').onclick = () => setBg('video');
  $('rgOverlay').oninput = () => { S.style.overlay = +$('rgOverlay').value; $('oOverlay').textContent = Math.round(S.style.overlay*100) + ' %'; if(!P) render(currentT()); store(); };
  $('selFont').onchange = () => { S.style.arFont = $('selFont').value; styleChanged(); };
  $('rgAr').oninput = () => { S.style.arSize = +$('rgAr').value; $('oAr').textContent = S.style.arSize; styleChanged(); };
  $('rgTr').oninput = () => { S.style.trSize = +$('rgTr').value; $('oTr').textContent = S.style.trSize; styleChanged(); };
  $('tgNum').onchange = () => { S.style.showNum = $('tgNum').checked; styleChanged(); };
  $('tgHeader').onchange = () => { S.style.header = $('tgHeader').checked; styleChanged(); };
  $('tgViz').onchange = () => { S.style.viz = $('tgViz').checked; store(); if(!P) render(currentT()); };
  $('tgProg').onchange = () => { S.style.progress = $('tgProg').checked; store(); if(!P) render(currentT()); };
  $('tgSafe').onchange = () => $('screen').classList.toggle('show-safe', $('tgSafe').checked);
  $('inReciter').oninput = () => { S.style.reciter = $('inReciter').value; S.style.reciterAuto = false; styleChanged(); };
  $('inHandle').oninput = () => { S.style.handle = $('inHandle').value; styleChanged(); };
  buildChips();

  document.querySelectorAll('#resGroup button').forEach(b => b.onclick = () => { if(P) return; S.res = +b.dataset.res; cv.width = S.res; cv.height = Math.round(S.res*16/9); syncStyleInputs(); store(); render(currentT()); updateExportInfo(); });
  $('tgMute').onchange = () => S.muteMonitor = $('tgMute').checked;
  document.querySelectorAll('#fmtGroup button').forEach(b => b.onclick = () => { S.fmt = b.dataset.fmt; document.querySelectorAll('#fmtGroup button').forEach(x => x.setAttribute('aria-checked', String(x === b))); updateExportInfo(); });
  $('btnRecord').onclick = async () => {
    if(X || (P && P.mode === 'record')){ toast('Une vidéo est déjà en cours de création.'); return; }
    if(!S.verses.length){ toast("Choisis d'abord tes versets (étape 1)."); return; }
    if(S.audioMode === 'reciter' && !S.buffer){ toast('Le son du récitateur n\u2019est pas encore prêt : regarde le message à l\u2019étape 2 « Récitateur ».'); openStudio('audio'); return; }
    if(P) stopPlay(true);
    try { ac().resume(); } catch(e){}
    $('resultBox').hidden = true; $('progBox').hidden = false; $('progBar').style.width = '0%'; $('progText').textContent = 'Préparation…';
    $('progBox').scrollIntoView({behavior:'smooth', block:'center'});
    let done = false;
    try { done = await fastExport(); } catch(e){ done = false; }
    if(!done){ $('progBox').hidden = false; $('progText').textContent = 'Passage à l\u2019enregistrement en direct…'; startPlay('record'); }
  };
  $('btnCancel').onclick = () => { if(X) X.cancel = true; else stopPlay(true); };
  $('btnSave').onclick = saveVideo;
  $('btnCopy').onclick = async () => { try { await navigator.clipboard.writeText($('caption').value); toast('Légende copiée.'); } catch(e){ $('caption').select(); toast('Sélectionnée : copie-la avec le menu du téléphone.'); } };

  $('btnPlay').onclick = () => { if(P) stopPlay(true); else startPlay('preview'); };
  $('scrub').oninput = () => { $('tCur').textContent = fmt(currentT()); if(S.style.bg === 'video' && S.media.video){ const v = S.media.video; try { v.currentTime = v.duration ? currentT() % v.duration : 0; } catch(e){} v.onseeked = () => render(currentT()); } render(currentT()); };
}
function manualApply(){
  const ar = $('manAr').value.split(/\n+/).map(s => s.trim()).filter(Boolean);
  if(!ar.length){ toast('Colle au moins un verset en arabe.'); return; }
  const tr = $('manTr').value.split(/\n+/).map(s => s.trim()).filter(Boolean);
  const f = Math.max(1, parseInt($('inFrom').value,10) || 1);
  S.manual = true; S.chapter = S.chapter && S.chapter.name ? S.chapter : null;
  S.verses = ar.slice(0, MAX_VERSES).map((a,i) => ({n: f + i, ar: a, tr: tr[i] || ''}));
  S.from = f; S.to = f + S.verses.length - 1; $('inTo').value = S.to;
  setStatus($('loadStatus'), 'Texte collé utilisé : ' + S.verses.length + ' verset(s). Relis-le bien avant de publier.', 'warn');
  renderVerseList(); onVersesChanged();
}

restore();
S.audioMode = 'reciter';
cv.width = S.res; cv.height = Math.round(S.res*16/9);
initUI(); syncStyleInputs(); initLibrary();
render(0);
loadSelection();
window.Tilawa = {S, times, totalDur, detectStarts, render};

