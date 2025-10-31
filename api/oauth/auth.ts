const CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI || `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/oauth/callback`;

export default async function handler(req: Request): Promise<Response> {
  try {
    if (!CLIENT_ID) {
      return new Response('Missing GITHUB_CLIENT_ID', { status: 500 });
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
    return new Response(`OAuth error: ${err?.message || String(err)}`, { status: 500 });
  }
}
