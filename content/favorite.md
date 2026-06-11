---
title: 我的收藏
---

<div class="page-container" style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
  <h2 style="font-size: 24px; margin-bottom: 30px; padding-bottom: 10px; border-bottom: 1px solid #eee;">我的收藏商品</h2>
  
  <div id="favBox">
    <p style="color: #666; text-align: center; padding: 40px 0;">加载中...</p>
  </div>
</div>

<style>
.fav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: box-shadow 0.2s;
}
.fav-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.fav-name {
  font-size: 16px;
  color: #333;
}
.btn-cancel {
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #dd4444;
  color: #dd4444;
  border-radius: 4px;
  cursor: pointer;
}
.btn-cancel:hover {
  background: #dd4444;
  color: #fff;
}
.empty-tip {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 15px;
}
.login-tip {
  text-align: center;
  padding: 60px 0;
  font-size: 15px;
}
.login-tip a {
  color: #0066cc;
  text-decoration: none;
}
</style>

<script>
(async function(){
  const box = document.getElementById("favBox");
  if(!currentUser) {
    box.innerHTML = `
      <div class="login-tip">
        请先 <a href="javascript:openLoginModal()">登录账号</a> 查看收藏
      </div>
    `;
    return;
  }

  const favList = await getFavorites();
  if(favList.length === 0) {
    box.innerHTML = `<div class="empty-tip">暂无收藏的商品</div>`;
    return;
  }

  let html = "";
  favList.forEach(id => {
    html += `
      <div class="fav-item">
        <div class="fav-name">商品规格ID：${id}</div>
        <button class="btn-cancel" onclick="delFavorite('${id}')">取消收藏</button>
      </div>
    `;
  });
  box.innerHTML = html;
})();
</script>