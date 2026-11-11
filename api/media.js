// Recherche de photos et de vidéos de fond libres de droits (utilisables sur TikTok) :
// Pixabay (variable PIXABAY_API_KEY dans Vercel) ou Pexels (PEXELS_API_KEY). La clé reste sur le serveur.
// Aucune personne : on écarte les résultats dont la description parle de gens.
export const config = { runtime: 'edge' };

const PEOPLE = /\b(man|men|woman|women|person|persons|people|girl|girls|boy|boys|child|children|kid|kids|baby|lady|ladies|guy|guys|tourist|tourists|crowd|couple|family|portrait|face|faces|hand|hands|soldier|soldiers|warrior|selfie|model|bride|groom|player|worker|farmer|rider|cowboy|athlete|dancer|praying|prayer|muslim|hijab|niqab|silhouette of a|human)\b/i;

function json(body, status, maxAge) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': maxAge ? `public, max-age=${maxAge}, s-maxage=86400` : 'no-store'
    }
  });
}
const crop = (src, w, h) => src + (src.includes('?') ? '&' : '?') + `auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export default async function handler(request) {
  const u = new URL(request.url);
  const q = (u.searchParams.get('q') || '').trim().slice(0, 90);
  const kind = u.searchParams.get('kind') || 'both';
  const fr = u.searchParams.get('lang') === 'fr';
  const page = Math.max(1, Math.min(10, parseInt(u.searchParams.get('page') || '1', 10) || 1));
  if (!q) return json({ error: 'no_query' }, 400);
  const pixKey = process.env.PIXABAY_API_KEY || process.env.CLE_API_PIXABAY || process.env.PIXABAY_KEY;
  if (pixKey) return pixabay(pixKey, q, kind, fr, page);
  if (process.env.PEXELS_API_KEY) return pexels(process.env.PEXELS_API_KEY, q, kind, fr, page);
  return json({ error: 'no_key' }, 503);
}

async function pixabay(key, q, kind, fr, page) {
  const base = `key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&safesearch=true&page=${page}&lang=${fr ? 'fr' : 'en'}`;
  const get = url => fetch(url).then(r => (r.ok ? r.json() : Promise.reject(r.status)));
  const [p, v] = await Promise.all([
    kind !== 'video' ? get(`https://pixabay.com/api/?${base}&image_type=photo&orientation=vertical&per_page=40`).catch(e => ({ error: e })) : null,
    kind !== 'photo' ? get(`https://pixabay.com/api/videos/?${base}&video_type=film&per_page=30`).catch(e => ({ error: e })) : null
  ]);
  if ((p && (p.error === 400 || p.error === 401)) && (!v || v.error)) return json({ error: 'bad_key' }, 503);
  const photos = ((p && p.hits) || [])
    .filter(x => !PEOPLE.test(x.tags || ''))
    .slice(0, 18)
    .map(x => ({
      id: 'x' + x.id, alt: x.tags || '', color: '#111',
      thumb: x.webformatURL, full: x.largeImageURL || x.webformatURL,
      by: x.user || '', page: x.pageURL
    }));
  const videos = ((v && v.hits) || [])
    .filter(x => !PEOPLE.test(x.tags || ''))
    .map(x => {
      const vs = x.videos || {}, f = vs.medium && vs.medium.url ? vs.medium : vs.small && vs.small.url ? vs.small : vs.large;
      if (!f || !f.url) return null;
      const thumb = (vs.medium && vs.medium.thumbnail) || (vs.small && vs.small.thumbnail) || (vs.tiny && vs.tiny.thumbnail) || '';
      return { id: 'y' + x.id, thumb, file: f.url, w: f.width, h: f.height, dur: x.duration, by: x.user || '', page: x.pageURL, portrait: f.height > f.width };
    })
    .filter(x => x && x.thumb)
    .sort((a, b) => (b.portrait ? 1 : 0) - (a.portrait ? 1 : 0))
    .slice(0, 9);
  return json({ q, provider: 'Pixabay', photos, videos }, 200, 3600);
}

async function pexels(key, q, kind, fr, page) {
  const headers = { Authorization: key };
  const get = url => fetch(url, { headers }).then(r => (r.ok ? r.json() : Promise.reject(r.status)));
  const qs = `query=${encodeURIComponent(q)}&orientation=portrait&page=${page}${fr ? '&locale=fr-FR' : ''}`;
  const [p, v] = await Promise.all([
    kind !== 'video' ? get(`https://api.pexels.com/v1/search?per_page=30&${qs}`).catch(e => ({ error: e })) : null,
    kind !== 'photo' ? get(`https://api.pexels.com/videos/search?per_page=15&size=medium&${qs}`).catch(e => ({ error: e })) : null
  ]);
  if ((p && p.error === 401) || (v && v.error === 401)) return json({ error: 'bad_key' }, 503);
  const photos = ((p && p.photos) || [])
    .filter(x => !PEOPLE.test(x.alt || '') && !PEOPLE.test(x.url || ''))
    .slice(0, 18)
    .map(x => ({
      id: 'p' + x.id, alt: x.alt || '', color: x.avg_color || '#111',
      thumb: crop(x.src.original, 270, 480), full: crop(x.src.original, 1080, 1920),
      by: x.photographer || '', page: x.url
    }));
  const videos = ((v && v.videos) || [])
    .filter(x => !PEOPLE.test(x.url || ''))
    .map(x => {
      const files = (x.video_files || []).filter(f => f.file_type === 'video/mp4' && f.height > f.width && f.link);
      files.sort((a, b) => Math.abs(a.height - 1280) - Math.abs(b.height - 1280));
      const f = files[0];
      return f ? { id: 'v' + x.id, thumb: crop(x.image, 270, 480), file: f.link, w: f.width, h: f.height, dur: x.duration, by: (x.user && x.user.name) || '', page: x.url } : null;
    })
    .filter(Boolean)
    .slice(0, 9);
  return json({ q, provider: 'Pexels', photos, videos }, 200, 3600);
}
