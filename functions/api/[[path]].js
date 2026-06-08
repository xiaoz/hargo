export default async function onRequest({ request, env }) {
    const url = new URL(request.url);
    const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
    const REDIRECT_URI = "https://hargo.pages.dev/api/callback";
  
    // 登录跳转 GitHub
    if (url.pathname === "/api/auth") {
      const authUrl = new URL("https://github.com/login/oauth/authorize");
      authUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
      authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
      authUrl.searchParams.set("scope", "repo");
      authUrl.searchParams.set("response_type", "code");
      return Response.redirect(authUrl.toString(), 302);
    }
  
    // 回调交换 token
    if (url.pathname === "/api/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Missing code", { status: 400 });
  
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });
  
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;
      if (!accessToken) return new Response("Failed to get token", { status: 400 });
  
      // 回 Decap 并带上 token
      return Response.redirect(`/admin#access_token=${accessToken}`, 302);
    }
  
    // 转发 Git 请求到 GitHub API
    const apiPath = url.pathname.replace("/api", "");
    return fetch(`https://api.github.com${apiPath}`, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }