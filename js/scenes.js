/* Tilawa — fonds animés, tous sans aucun signe ni symbole.
   13 décors × 9 ambiances de couleurs = 117 fonds. Tout est dessiné dans la page (rien à télécharger). */
(function(global){
  'use strict';
  const W = 1080, H = 1920;
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };
  function rng(seed){ return function(){ seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const rgba = (rgb, a) => 'rgba(' + rgb + ',' + (+a).toFixed(3) + ')';

  const PALETTES = [
    {id:'nuit', name:'Nuit', sky:['#040918','#0b1838','#13254a','#02050f'], glow:'120,150,220', land:['#2a3d63','#1c2b4a','#121d33','#080f1d'], acc:'215,232,255', acc2:'61,220,151'},
    {id:'or', name:'Or', sky:['#16110a','#1f180c','#120d06','#050403'], glow:'236,200,120', land:['#3a2b14','#2a1f0e','#1a1309','#0b0804'], acc:'236,200,120', acc2:'255,214,150'},
    {id:'emeraude', name:'Émeraude', sky:['#01120d','#053a2c','#0a4a38','#011a13'], glow:'120,220,170', land:['#0f5a44','#0a4434','#062e23','#021a14'], acc:'170,240,205', acc2:'214,178,94'},
    {id:'aube', name:'Aube', sky:['#0c0a24','#36204d','#9a4767','#eb9f5d'], glow:'255,196,130', land:['#7a3f45','#4a2440','#2d1630','#1d1226'], acc:'255,217,168', acc2:'255,170,190'},
    {id:'ocean', name:'Océan', sky:['#03101f','#0b2f4f','#1d5f7a','#062033'], glow:'170,225,240', land:['#1d4f66','#143c50','#0c2a3a','#051824'], acc:'205,240,255', acc2:'43,179,192'},
    {id:'sable', name:'Sable', sky:['#24180f','#4d321e','#94673f','#c99a62'], glow:'255,220,170', land:['#7d5232','#5f3e26','#412a19','#25170d'], acc:'255,232,195', acc2:'255,190,120'},
    {id:'lavande', name:'Lavande', sky:['#110b22','#2a1d4b','#56417f','#a387bd'], glow:'210,180,255', land:['#4a3a72','#382b5a','#251c40','#140f26'], acc:'232,218,255', acc2:'170,140,230'},
    {id:'braise', name:'Braise', sky:['#130405','#360c0f','#701c19','#b44f27'], glow:'255,150,90', land:['#5a1a16','#3e110f','#260a09','#120404'], acc:'255,195,145', acc2:'255,120,80'},
    {id:'argent', name:'Argent', sky:['#0b0c0f','#1a1d22','#30353c','#535a64'], glow:'220,225,235', land:['#3a3f47','#2b2f36','#1d2026','#0e1013'], acc:'236,241,248', acc2:'180,190,205'}
  ];
  const PAL = Object.fromEntries(PALETTES.map(p => [p.id, p]));

  function grad(g, stops, y0, y1){ const gr = g.createLinearGradient(0, y0 || 0, 0, y1 == null ? H : y1); stops.forEach(([o, c]) => gr.addColorStop(o, c)); return gr; }
  const sky4 = (g, P, a, b, c) => grad(g, [[0, P.sky[0]], [a || .45, P.sky[1]], [b || .75, P.sky[2]], [c || 1, P.sky[3]]]);
  function softSprite(size, rgb, a){
    const c = mk(size, size), q = c.getContext('2d'), rg = q.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    rg.addColorStop(0, rgba(rgb, a)); rg.addColorStop(.5, rgba(rgb, a * .45)); rg.addColorStop(1, rgba(rgb, 0));
    q.fillStyle = rg; q.fillRect(0, 0, size, size); return c;
  }
  function stars(g, r, n, maxY, maxR){ g.fillStyle = '#fff'; for(let i=0;i<n;i++){ g.globalAlpha = 0.12 + r()*0.5; g.beginPath(); g.arc(r()*W, Math.pow(r(), 1.6)*maxY, 0.5 + r()*(maxR || 1.4), 0, 6.283); g.fill(); } g.globalAlpha = 1; }
  function glowAt(g, x, y, rad, rgb, a){ const gl = g.createRadialGradient(x, y, 0, x, y, rad); gl.addColorStop(0, rgba(rgb, a)); gl.addColorStop(1, rgba(rgb, 0)); g.fillStyle = gl; g.fillRect(0, 0, W, H); }
  function fillPts(g, pts, fill){ g.beginPath(); g.moveTo(0, H); for(const [x, y] of pts) g.lineTo(x, y); g.lineTo(W, H); g.closePath(); g.fillStyle = fill; g.fill(); }
  function ridge(r, y0, amp, rough, step){
    const n = Math.ceil(W / step) + 1, pts = new Array(n).fill(0); let a = amp; let seg = [[0, n - 1]];
    pts[0] = (r() - .5) * amp; pts[n-1] = (r() - .5) * amp;
    for(let k=0; k<12 && seg.length; k++){ const nx = []; for(const [i, j] of seg){ if(j - i < 2) continue; const m = (i + j) >> 1; pts[m] = (pts[i] + pts[j]) / 2 + (r() - .5) * a; nx.push([i, m], [m, j]); } seg = nx; a *= rough; }
    return pts.map((p, i) => [i * step, y0 + p]);
  }

  /* Chaque décor : base(g, P, r) dessine la partie fixe ; init(P, r) prépare l'animation ; frame(ctx, t, s, P) l'anime */
  const SCENES = [
    {id:'etoiles', name:'Ciel étoilé', base(g, P, r){ g.fillStyle = sky4(g, P, .55, .8); g.fillRect(0, 0, W, H); glowAt(g, 760, 560, 900, P.glow, .16); },
      init(P, r){ return {st: Array.from({length:170}, () => ({x:r()*W, y:Math.pow(r(), 1.35)*H*0.9, s:0.6 + r()*2.1, p:r()*6.283, v:0.35 + r()*1.5}))}; },
      frame(ctx, t, s){ ctx.fillStyle = '#ffffff'; for(const p of s.st){ ctx.globalAlpha = 0.2 + 0.8*Math.abs(Math.sin(t*p.v + p.p)); ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill(); } ctx.globalAlpha = 1; }},
    {id:'poussiere', name:'Poussière de lumière', base(g, P){ const gr = g.createRadialGradient(540, 820, 0, 540, 820, 1300); gr.addColorStop(0, P.sky[1]); gr.addColorStop(1, P.sky[0]); g.fillStyle = gr; g.fillRect(0, 0, W, H); },
      init(P, r){ return {sp: softSprite(64, P.acc, 1), d: Array.from({length:55}, () => ({x:r()*W, y:r()*H, s:6 + r()*22, v:8 + r()*26, a:0.12 + r()*0.4, p:r()*6.283}))}; },
      frame(ctx, t, s){ for(const p of s.d){ const y = ((p.y - t*p.v) % (H+60) + H + 60) % (H+60) - 30, x = p.x + Math.sin(t*0.35 + p.p)*14; ctx.globalAlpha = p.a*(0.6 + 0.4*Math.sin(t*0.8 + p.p)); ctx.drawImage(s.sp, x - p.s, y - p.s, p.s*2, p.s*2); } ctx.globalAlpha = 1; }},
    {id:'horizon', name:'Horizon', base(g, P, r){ g.fillStyle = grad(g, [[0, P.sky[0]], [.42, P.sky[1]], [.74, P.sky[2]], [1, P.sky[3]]]); g.fillRect(0, 0, W, H); stars(g, r, 70, H*0.45, 1.6); },
      init(){ return {}; },
      frame(ctx, t, s, P){ const x = 540 + Math.sin(t*0.12)*260, rg = ctx.createRadialGradient(x, 1700, 0, x, 1700, 900); rg.addColorStop(0, rgba(P.glow, .28)); rg.addColorStop(1, rgba(P.glow, 0)); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H); }},
    {id:'desert', name:'Dunes', base(g, P, r){
        const hz = H*0.66; g.fillStyle = grad(g, [[0, P.sky[0]], [.42, P.sky[1]], [.6, P.sky[2]], [.68, P.sky[3]], [1, P.sky[3]]]); g.fillRect(0, 0, W, H);
        stars(g, r, 60, H*0.35); glowAt(g, 540, hz, 700, P.glow, .42);
        const dune = (y0, a1, f1, p1, a2, f2, p2, fill, edge) => { const pts = []; for(let x=0; x<=W+20; x+=20) pts.push([x, y0 + a1*Math.sin(x*f1 + p1) + a2*Math.sin(x*f2 + p2)]); fillPts(g, pts, fill);
          if(edge){ g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.strokeStyle = edge; g.lineWidth = 2.5; g.stroke(); } };
        dune(H*0.68, 34, 0.004, 0.6, 14, 0.011, 2.1, P.land[0], rgba(P.glow, .35)); dune(H*0.76, 52, 0.0032, 2.4, 18, 0.009, 0.4, P.land[1], rgba(P.glow, .22)); dune(H*0.87, 60, 0.0026, 4.1, 20, 0.008, 1.3, P.land[3]); },
      init(P, r){ return {d: Array.from({length:70}, () => ({x:r()*W, y:H*0.62 + r()*H*0.38, v:12 + r()*30, s:0.8 + r()*1.8, a:0.15 + r()*0.35, p:r()*6.283}))}; },
      frame(ctx, t, s, P){ ctx.fillStyle = rgba(P.acc, 1); for(const p of s.d){ const x = ((p.x + t*p.v) % (W+20) + W + 20) % (W+20) - 10, y = p.y + Math.sin(t*0.6 + p.p)*6; ctx.globalAlpha = p.a; ctx.beginPath(); ctx.arc(x, y, p.s, 0, 6.283); ctx.fill(); } ctx.globalAlpha = 1; }},
    {id:'ocean', name:'Mer calme', base(g, P, r){
        g.fillStyle = grad(g, [[0, P.sky[0]], [.5, P.sky[1]], [.6, P.sky[2]], [.6001, P.land[1]], [1, P.land[3]]]); g.fillRect(0, 0, W, H);
        stars(g, r, 50, H*0.3); glowAt(g, 540, H*0.6, 620, P.glow, .35); },
      init(P, r){ return {w: Array.from({length:150}, () => ({d:r(), x:(r()-.5)*2, w:r(), p:r()*6.283, s:0.8 + r()*1.8}))}; },
      frame(ctx, t, s, P){ const hz = H*0.6; for(const w of s.w){ const d = (w.d + t*0.018) % 1, z = d*d, y = hz + 4 + z*(H - hz), len = 30 + z*360*(0.4 + w.w), cx = 540 + w.x*(60 + z*520);
          const a = (0.08 + 0.32*(0.5 + 0.5*Math.sin(t*w.s + w.p))) * (1 - Math.abs(w.x)*0.7) * (0.35 + 0.65*(1 - d*0.6)); ctx.fillStyle = rgba(P.acc, a); ctx.fillRect(cx - len/2, y, len, 1.5 + z*4); } }},
    {id:'pluie', name:'Pluie', base(g, P, r){
        g.fillStyle = grad(g, [[0, P.sky[0]], [.55, P.sky[1]], [1, P.sky[3]]]); g.fillRect(0, 0, W, H);
        const cols = [P.glow, P.acc2, P.acc, P.glow]; for(let i=0;i<34;i++){ const s = 60 + r()*220; g.drawImage(softSprite(s, cols[i % 4], 0.2 + r()*0.28), r()*W - s/2, H*0.25 + r()*H*0.7 - s/2); } },
      init(P, r){ return {d: Array.from({length:170}, (_, i) => ({x:r()*W*1.2, y:r()*H, v:(i % 3 ? 1300 : 2100) + r()*500, l:(i % 3 ? 26 : 60) + r()*30, near: i % 3 === 0}))}; },
      frame(ctx, t, s, P){ ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        for(const near of [false, true]){ ctx.strokeStyle = rgba(P.acc, near ? 0.3 : 0.16); ctx.beginPath();
          for(const d of s.d){ if(d.near !== near) continue; const y = ((d.y + t*d.v) % (H + 160)) - 80, x = d.x - (y/H)*120; ctx.moveTo(x, y); ctx.lineTo(x - d.l*0.12, y + d.l); } ctx.stroke(); } }},
    {id:'montagnes', name:'Montagnes', base(g, P, r){
        g.fillStyle = grad(g, [[0, P.sky[0]], [.35, P.sky[1]], [.6, P.sky[2]], [1, P.sky[2]]]); g.fillRect(0, 0, W, H); stars(g, r, 40, H*0.25, 1.1);
        [[H*0.56, 220, P.land[0]], [H*0.64, 200, P.land[1]], [H*0.73, 180, P.land[2]], [H*0.84, 160, P.land[3]]].forEach(([y0, amp, col], i) => {
          fillPts(g, ridge(r, y0, amp, 0.55, 8), col);
          if(i < 3){ const m = g.createLinearGradient(0, y0 - 40, 0, y0 + 220); m.addColorStop(0, rgba(P.glow, 0)); m.addColorStop(.6, rgba(P.glow, .14)); m.addColorStop(1, rgba(P.glow, 0)); g.fillStyle = m; g.fillRect(0, y0 - 40, W, 260); } }); },
      init(P){ return {m: softSprite(900, P.glow, 0.2)}; },
      frame(ctx, t, s){ for(let i=0;i<4;i++){ const x = ((i*420 + t*(10 + i*4)) % (W + 1100)) - 900, y = H*(0.58 + i*0.08); ctx.drawImage(s.m, x, y - 120, 1100, 240); } }},
    {id:'nuages', name:'Nuages', base(g, P){ g.fillStyle = grad(g, [[0, P.sky[0]], [.5, P.sky[1]], [.85, P.sky[2]], [1, P.sky[3]]]); g.fillRect(0, 0, W, H); },
      init(P, r){ return {c: Array.from({length:7}, (_, k) => { const cw = 700, ch = 300, cc = mk(cw, ch), q = cc.getContext('2d');
          for(let i=0;i<16;i++){ const z = 120 + r()*180; q.drawImage(softSprite(z, P.acc, 0.14 + r()*0.12), 80 + r()*(cw - 160) - z/2, ch/2 + (r()-.5)*90 - z/2); }
          return {c:cc, x:r()*W*1.6, y:H*0.08 + k*H*0.13 + (r()-.5)*80, v:6 + r()*12, sc:0.8 + r()*0.7}; })}; },
      frame(ctx, t, s){ for(const k of s.c){ const w = 700*k.sc, x = ((k.x + t*k.v) % (W + w)) - w; ctx.drawImage(k.c, x, k.y, w, 300*k.sc); } }},
    {id:'rayons', name:'Rayons de lumière', base(g, P){ g.fillStyle = grad(g, [[0, P.sky[1]], [.5, P.sky[0]], [1, P.sky[3]]]); g.fillRect(0, 0, W, H); },
      init(P, r){ return {ray: mk(W/8, H/8), dust: softSprite(32, P.acc, 0.9), rays: Array.from({length:6}, (_, i) => ({a:-0.36 + i*0.14 + (r()-.5)*0.06, w:0.05 + r()*0.05, p:r()*6.283, al:0.10 + r()*0.10})),
          m: Array.from({length:60}, () => ({x:r()*W, y:r()*H, s:2 + r()*6, v:4 + r()*10, p:r()*6.283, a:0.15 + r()*0.45}))}; },
      frame(ctx, t, s, P){ const q = s.ray.getContext('2d'), k = 1/8, ox = 540*k, oy = -300*k, L = H*1.3*k; q.clearRect(0, 0, s.ray.width, s.ray.height);
        for(const r of s.rays){ const a = r.a + Math.sin(t*0.15 + r.p)*0.03, w = r.w*(0.85 + 0.15*Math.sin(t*0.4 + r.p)), gr = q.createLinearGradient(ox, oy, ox + Math.sin(a)*L, oy + Math.cos(a)*L);
          gr.addColorStop(0, rgba(P.glow, r.al)); gr.addColorStop(.55, rgba(P.glow, r.al*0.4)); gr.addColorStop(1, rgba(P.glow, 0)); q.fillStyle = gr;
          q.beginPath(); q.moveTo(ox, oy); q.lineTo(ox + Math.sin(a - w)*L, oy + Math.cos(a - w)*L); q.lineTo(ox + Math.sin(a + w)*L, oy + Math.cos(a + w)*L); q.closePath(); q.fill(); }
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.imageSmoothingEnabled = true; ctx.drawImage(s.ray, 0, 0, W, H);
        for(const m of s.m){ const y = ((m.y - t*m.v) % H + H) % H, x = m.x + Math.sin(t*0.3 + m.p)*18; ctx.globalAlpha = m.a*(0.6 + 0.4*Math.sin(t + m.p)); ctx.drawImage(s.dust, x - m.s, y - m.s, m.s*2, m.s*2); }
        ctx.restore(); }},
    {id:'aurore', name:'Aurore', base(g, P, r){ g.fillStyle = grad(g, [[0, P.sky[0]], [.55, P.sky[1]], [1, P.sky[3]]]); g.fillRect(0, 0, W, H); stars(g, r, 160, H*0.95, 1.5);
        const gd = g.createLinearGradient(0, H*0.88, 0, H); gd.addColorStop(0, 'rgba(0,0,0,0)'); gd.addColorStop(1, 'rgba(0,0,0,.8)'); g.fillStyle = gd; g.fillRect(0, H*0.85, W, H*0.15); },
      init(P){ return {rib: [[P.acc2, 520, 140, 0.0042, 0.35, 0, 380], [P.glow, 700, 110, 0.0055, 0.27, 2.1, 300], [P.acc, 380, 90, 0.0036, 0.22, 4.2, 240]].map(([rgb, y, A, f, sp, p, L]) => {
          const c = mk(1, 256), q = c.getContext('2d'), gr = q.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, rgba(rgb, 0)); gr.addColorStop(.75, rgba(rgb, .55)); gr.addColorStop(.9, rgba(rgb, .3)); gr.addColorStop(1, rgba(rgb, 0)); q.fillStyle = gr; q.fillRect(0, 0, 1, 256);
          return {c, y, A, f, sp, p, L}; })}; },
      frame(ctx, t, s){ ctx.save(); ctx.globalCompositeOperation = 'lighter';
        for(const r of s.rib) for(let x=0; x<W; x+=6){ const y = r.y + r.A*Math.sin(x*r.f + t*r.sp + r.p) + 40*Math.sin(x*r.f*2.3 - t*r.sp*1.3), L = r.L*(0.6 + 0.4*Math.sin(x*0.006 + t*0.5 + r.p));
          ctx.globalAlpha = 0.55 + 0.45*Math.sin(x*0.004 - t*0.7 + r.p); ctx.drawImage(r.c, x, y - L, 7, L); }
        ctx.restore(); }},
    {id:'brume', name:'Brume', base(g, P){ g.fillStyle = grad(g, [[0, P.sky[0]], [.5, P.sky[1]], [1, P.sky[2]]]); g.fillRect(0, 0, W, H); glowAt(g, 540, H*0.42, 1000, P.glow, .14); },
      init(P, r){ return {f: softSprite(700, P.acc, 0.16), l: Array.from({length:9}, () => ({x:r()*W, y:r()*H, s:1.2 + r()*1.4, v:6 + r()*14, p:r()*6.283}))}; },
      frame(ctx, t, s){ for(const l of s.l){ const w = 700*l.s, x = ((l.x + t*l.v) % (W + w)) - w, y = l.y + Math.sin(t*0.1 + l.p)*40; ctx.drawImage(s.f, x, y - w*0.3, w, w*0.6); } }},
    {id:'vagues', name:'Vagues douces', base(g, P){ g.fillStyle = grad(g, [[0, P.sky[0]], [.6, P.sky[1]], [1, P.sky[3]]]); g.fillRect(0, 0, W, H); },
      init(P){ return {b: [[H*0.58, 70, 0.0035, 0.35, P.land[0], .55], [H*0.66, 80, 0.003, -0.28, P.land[1], .7], [H*0.75, 90, 0.0026, 0.22, P.land[2], .85], [H*0.85, 100, 0.0022, -0.18, P.land[3], 1]]}; },
      frame(ctx, t, s, P){ for(const [y0, A, f, sp, col, a] of s.b){ ctx.beginPath(); ctx.moveTo(0, H); for(let x=0; x<=W+30; x+=30) ctx.lineTo(x, y0 + A*Math.sin(x*f + t*sp) + A*0.35*Math.sin(x*f*2.7 - t*sp*1.6));
          ctx.lineTo(W, H); ctx.closePath(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rgba(P.glow, .25); ctx.lineWidth = 2; ctx.stroke(); } ctx.globalAlpha = 1; }},
    {id:'uni', name:'Uni', base(g, P){ const gr = g.createRadialGradient(540, 860, 0, 540, 860, 1250); gr.addColorStop(0, P.sky[1]); gr.addColorStop(1, P.sky[0]); g.fillStyle = gr; g.fillRect(0, 0, W, H); },
      init(){ return {}; }, frame(){}}
  ];
  const SC = Object.fromEntries(SCENES.map(s => [s.id, s]));

  /* Liste complète : id "decor.ambiance" */
  const ALL = [];
  for(const s of SCENES) for(const p of PALETTES) ALL.push({id: s.id + '.' + p.id, scene: s, pal: p, name: s.name + ' · ' + p.name});
  const seedOf = id => { let h = 2166136261; for(const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };

  let cur = null;  // fond en cours : base pleine résolution + état d'animation
  function resolve(id){
    const [s, p] = String(id || '').split('.');
    return {scene: SC[s] || SC.etoiles, pal: PAL[p] || PAL.nuit};
  }
  function draw(ctx, id, t){
    if(!cur || cur.id !== id){
      const {scene, pal} = resolve(id), r = rng(seedOf(id)), c = mk(W, H), g = c.getContext('2d');
      scene.base(g, pal, r);
      cur = {id, scene, pal, base: c, st: scene.init(pal, r)};
    }
    ctx.drawImage(cur.base, 0, 0);
    cur.scene.frame(ctx, t, cur.st, cur.pal);
  }
  /* Vignette : dessin direct à petite taille, sans garder de grande image en mémoire */
  function thumb(canvas, id, t){
    const {scene, pal} = resolve(id), r = rng(seedOf(id)), g = canvas.getContext('2d');
    g.save(); g.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    scene.base(g, pal, r); scene.frame(g, t == null ? 2.5 : t, scene.init(pal, r), pal);
    g.restore();
  }
  global.TilawaScenes = {SCENES, PALETTES, ALL, draw, thumb, resolve, W, H};
})(window);
