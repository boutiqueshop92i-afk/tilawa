// Relais audio : récupère les fichiers de récitation (mp3quran, everyayah, quranicaudio)
// pour que la page puisse lire le son et le mettre dans la vidéo, même quand le site
// d'origine ne l'autorise pas directement. Uniquement ces sites : pas un relais ouvert.
export const config = { runtime: 'edge' };

const ALLOWED = [
  /^([a-z0-9-]+\.)*mp3quran\.net$/i,
  /^([a-z0-9-]+\.)*everyayah\.com$/i,
  /^([a-z0-9-]+\.)*quranicaudio\.com$/i,
  /^([a-z0-9-]+\.)*qurancdn\.com$/i
];

export default async function handler(request) {
  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'range',
    'access-control-expose-headers': 'content-length, content-range, accept-ranges'
  };
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

  const target = new URL(request.url).searchParams.get('u');
  let url;
  try { url = new URL(target); } catch (e) { return new Response('Adresse invalide', { status: 400, headers: cors }); }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return new Response('Adresse invalide', { status: 400, headers: cors });
  if (!ALLOWED.some(re => re.test(url.hostname))) return new Response('Site non autorisé', { status: 403, headers: cors });

  const headers = { 'user-agent': 'Tilawa/1.0 (+https://vercel.app)' };
  const range = request.headers.get('range');
  if (range) headers.range = range;

  let upstream;
  try {
    upstream = await fetch(url.toString(), { method: request.method === 'HEAD' ? 'HEAD' : 'GET', headers, redirect: 'follow' });
  } catch (e) {
    return new Response('Source injoignable', { status: 502, headers: cors });
  }
  const out = new Headers(cors);
  for (const h of ['content-type', 'content-length', 'content-range', 'accept-ranges', 'last-modified', 'etag']) {
    const v = upstream.headers.get(h);
    if (v) out.set(h, v);
  }
  const isJson = (upstream.headers.get('content-type') || '').includes('json');
  out.set('cache-control', upstream.ok ? (isJson ? 'public, max-age=3600, s-maxage=86400' : 'public, max-age=604800, s-maxage=31536000, immutable') : 'no-store');
  return new Response(request.method === 'HEAD' ? null : upstream.body, { status: upstream.status, headers: out });
}
