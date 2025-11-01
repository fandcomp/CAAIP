export const config = { runtime: 'edge' };

function successHtml(token: string, provider = 'github') {
  const payload = JSON.stringify({ token, provider }).replace(/</g, '\\u003c');
  const providerSafe = String(provider).replace(/[^a-z0-9_-]/gi, '');
  return `<!doctype html><html><body>
  <script>
    (function() {
      var message = 'authorization:${providerSafe}:success:' + ${JSON.stringify(payload)};
      var attempts = 10;
      function trySend() {
        var sent = false;
        try {
          if (window.opener && typeof window.opener.postMessage === 'function') {
            try { window.opener.postMessage(message, window.location.origin); sent = true; } catch (e) {}
            try { window.opener.postMessage(message, '*'); sent = true; } catch (e) {}
          }
        } catch (e) {}
        attempts--;
        if (sent || attempts <= 0) {
          if (!sent) {
            try { window.location.replace('/admin/#' + encodeURIComponent(message)); } catch (e) {
              document.body.innerText = 'Authorization complete. You can close this window.';
            }
          } else {
            window.close();
          }
        } else {
          setTimeout(trySend, 100);
        }
      }
      trySend();
    })();
  </script>
  </body></html>`;
}

export default async function handler(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const provided = url.searchParams.get('secret') || '';
    const debug = url.searchParams.get('debug') === '1' || url.searchParams.get('inspect') === '1';
    const expected = process.env.OAUTH_DIRECT_SECRET || '';
    const token = process.env.GITHUB_DIRECT_TOKEN || '';
    if (debug) {
      const maskedToken = token ? token.replace(/.(?=.{6})/g, '•') : '';
      const maskedSecret = expected ? expected.replace(/.(?=.{6})/g, '•') : '';
      const base = `${url.origin}/api/oauth/direct`;
      const tryUrl = `${base}?secret=${encodeURIComponent(expected)}&debug=0`;
      const html = `<!doctype html><html><body>
        <h1>Direct OAuth Debug</h1>
        <ul>
          <li>Configured: <strong>${expected && token ? 'YES' : 'NO'}</strong></li>
          <li>GITHUB_DIRECT_TOKEN: <code>${maskedToken || '(missing)'}</code></li>
          <li>OAUTH_DIRECT_SECRET: <code>${maskedSecret || '(missing)'}</code></li>
        </ul>
        <p>Jika <strong>Configured = NO</strong>, set kedua env vars di Vercel Project &gt; Settings &gt; Environment Variables, lalu redeploy.</p>
        ${expected && token ? `<p><a href="${tryUrl}">Coba buka popup direct login</a></p>` : ''}
      </body></html>`;
      return new Response(html, { status: 200, headers: { 'content-type': 'text/html' } });
    }
    if (!expected || !token) {
      return new Response('Direct login not configured', { status: 501 });
    }
    if (!provided || provided !== expected) {
      return new Response('Unauthorized', { status: 401 });
    }
    const html = successHtml(token);
    return new Response(html, { status: 200, headers: { 'content-type': 'text/html' } });
  } catch (err: any) {
    const html = `<!doctype html><html><body>
    <h1>Direct OAuth error</h1>
    <pre>${(err?.message || String(err))}</pre>
    </body></html>`;
    return new Response(html, { status: 500, headers: { 'content-type': 'text/html' } });
  }
}
