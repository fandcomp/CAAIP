export const config = { runtime: 'edge' };

const CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI as string; // must be set explicitly to avoid GitHub mismatch

export default async function handler(req: Request): Promise<Response> {
  try {
    if (!CLIENT_ID) {
      const html = `<!doctype html><html><body>
      <h1>OAuth Misconfiguration</h1>
      <p>Missing GITHUB_CLIENT_ID. Set it in Vercel Project Settings &gt; Environment Variables.</p>
      </body></html>`;
      return new Response(html, { status: 500, headers: { 'content-type': 'text/html' } });
    }
    if (!REDIRECT_URI) {
      const html = `<!doctype html><html><body>
      <h1>OAuth Misconfiguration</h1>
      <p>Missing OAUTH_REDIRECT_URI. Set it to the exact callback registered in your GitHub OAuth App.</p>
      <p>Expected value example: <code>https://caaip.vercel.app/api/oauth/callback</code></p>
      </body></html>`;
      return new Response(html, { status: 500, headers: { 'content-type': 'text/html' } });
    }
    const state = crypto.randomUUID();
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'repo,user',
      state,
      allow_signup: 'true',
    });
    const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
    return Response.redirect(url, 302);
  } catch (err: any) {
    const html = `<!doctype html><html><body>
    <h1>OAuth error</h1>
    <pre>${(err?.message || String(err))}</pre>
    </body></html>`;
    return new Response(html, { status: 500, headers: { 'content-type': 'text/html' } });
  }
}
