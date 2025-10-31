export const config = { runtime: 'edge' };

const CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI || `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/oauth/callback`;

async function exchangeCodeForToken(code: string) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI,
  });
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: params,
  });
  if (!res.ok) throw new Error(`GitHub token error: ${res.status}`);
  return res.json() as Promise<{ access_token?: string; token_type?: string; scope?: string; error?: string; error_description?: string }>;
}

function successHtml(token: string, provider = 'github') {
  // Create a JSON string payload and escape '<' to avoid HTML/script parsing issues
  const payload = JSON.stringify({ token }).replace(/</g, '\\u003c');
  return `<!doctype html><html><body>
  <script>
    (function() {
      var payload = ${JSON.stringify(payload)}; // JSON string, e.g. "{\"token\":\"...\"}"
      var message = 'authorization:${provider}:success:' + payload;
      function send() {
        try {
          if (window.opener && typeof window.opener.postMessage === 'function') {
            window.opener.postMessage(message, '*');
            window.close();
            return;
          }
        } catch (e) {}
        // Fallback: show a simple message if window.opener is unavailable
        document.body.innerText = 'Authorization complete. You can close this window.';
      }
      send();
    })();
  </script>
  </body></html>`;
}

export default async function handler(req: Request): Promise<Response> {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      const html = `<!doctype html><html><body>
      <h1>OAuth Misconfiguration</h1>
      <p>Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET.</p>
      </body></html>`;
      return new Response(html, { status: 500, headers: { 'content-type': 'text/html' } });
    }
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    if (!code) {
      const html = `<!doctype html><html><body>
      <h1>OAuth Error</h1>
      <p>Missing <code>code</code> parameter from GitHub.</p>
      </body></html>`;
      return new Response(html, { status: 400, headers: { 'content-type': 'text/html' } });
    }

    const data = await exchangeCodeForToken(code);
    if (!data.access_token) {
      return new Response(`OAuth failed: ${data.error || 'no_token'} ${data.error_description || ''}`, { status: 400 });
    }

    const html = successHtml(data.access_token);
    return new Response(html, { status: 200, headers: { 'content-type': 'text/html' } });
  } catch (err: any) {
    const html = `<!doctype html><html><body>
    <h1>OAuth error</h1>
    <pre>${(err?.message || String(err))}</pre>
    </body></html>`;
    return new Response(html, { status: 500, headers: { 'content-type': 'text/html' } });
  }
}
