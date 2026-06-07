export async function onRequest({ request, env }) {
    const { pathname } = new URL(request.url);
    const route = pathname.replace("/api/", "");
    const SITE = "https://hargo.pages.dev";
    const CLIENT_ID = env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
  
    if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response("缺少OAuth密钥", { status: 500 });
    }
  
    // 处理 /api/auth 跳转
    if (route === "auth") {
      const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${SITE}/api/callback&scope=repo,user`;
      return Response.redirect(oauthUrl, 302);
    }
  
    // 处理 /api/callback 回调
    if (route === "callback") {
      const code = new URL(request.url).searchParams.get("code");
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: `${SITE}/api/callback`
        })
      });
      const tokenData = await tokenRes.json();
      if (tokenData.access_token) {

    
         return Response.redirect(`${SITE}/admin/#access_token=${tokenData.access_token}`, 302);
        // return Response.redirect(`${SITE}/admin#access_token=${tokenData.access_token}`, 302);
      }
      return new Response("获取token失败", { status: 400 });
    }
  
    return new Response("Not Found", { status: 404 });
  }