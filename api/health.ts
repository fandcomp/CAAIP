export const config = { runtime: 'edge' };

export default function handler(): Response {
  return new Response('ok', { status: 200, headers: { 'content-type': 'text/plain' } });
}
