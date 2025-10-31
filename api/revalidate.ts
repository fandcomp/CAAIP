export default async function handler(req: Request): Promise<Response> {
  try {
    const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!hook) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing VERCEL_DEPLOY_HOOK_URL' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }
    const res = await fetch(hook, { method: 'POST' });
    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ ok: false, error: text || res.statusText }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
