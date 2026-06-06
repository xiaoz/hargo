export default async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const path = url.pathname.replace("/api/", "");
  
    
      // 缺少环境变量直接报错
    if(!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET){
        return new Response('缺少OAuth密钥',{status:500})
    }
    const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
    const SITE_URL = "https://hargo.pages.dev";


    // 登录跳转授权
    if(path === "auth"){
      return Response.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${SITE_URL}/api/callback&scope=repo,user`,302)
    }
  
    // 回调获取token
    if(path === "callback"){
      const code = url.searchParams.get("code");
      const res = await fetch("https://github.com/login/oauth/access_token",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({client_id:GITHUB_CLIENT_ID,client_secret:GITHUB_CLIENT_SECRET,code,redirect_uri:`${SITE_URL}/api/callback`})
      })
      const data = await res.json();
      const token = data.access_token;
      return Response.redirect(`${SITE_URL}/admin#access_token=${token}`,302)
    }
  
    return new Response("Not Found",{status:404})
  }