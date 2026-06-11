---
title: 我的收藏
---
<div id="favList">加载中...</div>

<script>
(async function(){
  if(!currentUser) {
    document.getElementById("favList").innerHTML = "<p>请先 <a href='javascript:openLoginModal()'>登录</a></p>";
    return;
  }
  const favIds = await getFavorites();
  if(favIds.length === 0) {
    document.getElementById("favList").innerHTML = "<p>暂无收藏商品</p>";
    return;
  }
  let html = "";
  // 简单展示ID，你可自行优化为商品名称/图片
  favIds.forEach(id => {
    html += `<div>商品规格ID：${id} <button onclick="delFavorite('${id}')">取消收藏</button></div>`;
  });
  document.getElementById("favList").innerHTML = html;
})();
</script>