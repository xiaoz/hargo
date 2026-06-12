---
title: My Favorites
---

<div class="container content">
  <h2 class="title is-3 mb-5">My Favorite Products</h2>
  <div id="favBox">
    <p>Loading...</p>
  </div>
</div>

<script>
(async function(){
  const box = document.getElementById("favBox");
  if(!currentUser) {
    box.innerHTML = `<p>Please <a href="javascript:openLoginModal()">login</a> to view your favorites</p>`;
    return;
  }
  const favList = await getFavorites();
  if(favList.length === 0) {
    box.innerHTML = `<p>No favorite products yet</p>`;
    return;
  }
  let html = "";
  favList.forEach(id => {
    html += `
      <div class="card mb-3" style="border:1px solid #D1D1D1;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <div class="card-content" style="padding:1rem;">
          <div class="is-flex is-justify-content-space-between is-align-items-center">
            <span style="color:#333;">Product SKU: ${id}</span>
            <button class="btn btn-outline-primary" onclick="delFavorite('${id}')" style="padding:4px 12px;font-size:14px;">Remove from Favorites</button>
          </div>
        </div>
      </div>
    `;
  });
  box.innerHTML = html;
})();
</script>