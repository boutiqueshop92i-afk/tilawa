// Recherche de photos et de vidéos de fond sur Pexels (libres de droits, utilisables sur TikTok).
// La clé reste sur le serveur : variable d'environnement PEXELS_API_KEY dans Vercel.
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
  const q = (u.searchParams.get('q') || '').trim().slice(0, 80);
  const kind = u.searchParams.get('kind') || 'both';
  const locale = u.searchParams.get('lang') === 'fr' ? '&locale=fr-FR' : '';
  const page = Math.max(1, Math.min(10, parseInt(u.searchParams.get('page') || '1', 10) || 1));
  const key = process.env.PEXELS_API_KEY;
  if (!key) return json({ error: 'no_key' }, 503);
  if (!q) return json({ error: 'no_query' }, 400);
  const headers = { Authorization: key };
  const get = url => fetch(url, { headers }).then(r => (r.ok ? r.json() : Promise.reject(r.status)));
  const qs = `query=${encodeURIComponent(q)}&orientation=portrait&page=${page}${locale}`;
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
  return json({ q, photos, videos }, 200, 3600);
}
