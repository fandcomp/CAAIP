export default function handler(): Response {
  return new Response('Not used on Netlify', { status: 404, headers: { 'content-type': 'text/plain' } });
}
