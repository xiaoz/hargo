---
title: 收货地址管理
---

<div class="page-container" style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
  <h2 style="font-size: 24px; margin-bottom: 30px; padding-bottom: 10px; border-bottom: 1px solid #eee;">收货地址管理</h2>

  <!-- 新增地址区域 -->
  <div style="border: 1px solid #eee; border-radius: 8px; padding: 25px; margin-bottom: 40px;">
    <h3 style="font-size: 18px; margin: 0 0 20px 0;">新增收货地址</h3>
    <div style="display: grid; gap: 15px;">
      <input type="text" id="addrName" placeholder="收货人姓名" style="width: 100%; box-sizing: border-box; padding: 12px 15px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
      <input type="text" id="addrPhone" placeholder="联系电话" style="width: 100%; box-sizing: border-box; padding: 12px 15px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
      <input type="text" id="addrDetail" placeholder="详细收货地址" style="width: 100%; box-sizing: border-box; padding: 12px 15px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
      <button onclick="saveNewAddr()" style="width: 140px; padding: 12px; background: #222; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">保存地址</button>
    </div>
  </div>

  <!-- 地址列表区域 -->
  <div>
    <h3 style="font-size: 18px; margin: 0 0 20px 0;">已保存地址</h3>
    <div id="addrBox">
      <p style="color: #666; text-align: center; padding: 40px 0;">加载中...</p>
    </div>
  </div>
</div>

<style>
.addr-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
}
.addr-info {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #333;
}
.default-tag {
  display: inline-block;
  background: #222;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 3px;
  margin-left: 10px;
}
.btn-group {
  display: flex;
  gap: 10px;
}
.btn-set {
  padding: 7px 14px;
  border: 1px solid #222;
  background: #fff;
  color: #222;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.btn-del {
  padding: 7px 14px;
  border: 1px solid #dd4444;
  background: #fff;
  color: #dd4444;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
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
// 提交新增地址
async function saveNewAddr(){
  const name = document.getElementById("addrName").value.trim();
  const phone = document.getElementById("addrPhone").value.trim();
  const detail = document.getElementById("addrDetail").value.trim();
  if(!name || !phone || !detail) {
    alert("请填写完整的地址信息");
    return;
  }
  await addAddress({name,phone,detail});
}

// 渲染地址列表
(async function(){
  const box = document.getElementById("addrBox");
  if(!currentUser) {
    box.innerHTML = `
      <div class="login-tip">
        请先 <a href="javascript:openLoginModal()">登录账号</a> 管理地址
      </div>
    `;
    return;
  }

  const list = await getAddressList();
  if(list.length === 0) {
    box.innerHTML = `<div class="empty-tip">暂无保存的收货地址</div>`;
    return;
  }

  let html = "";
  list.forEach(item => {
    html += `
      <div class="addr-card">
        <div class="addr-info">
          <span>收货人：${item.name}</span>
          <span>联系电话：${item.phone}</span>
          ${item.isDefault ? '<span class="default-tag">默认地址</span>' : ''}
          <p style="margin:8px 0 0 0;">详细地址：${item.detail}</p>
        </div>
        <div class="btn-group">
          ${!item.isDefault ? `<button class="btn-set" onclick="setDefaultAddr('${item.id}')">设为默认</button>` : ''}
          <button class="btn-del" onclick="delAddress('${item.id}')">删除地址</button>
        </div>
      </div>
    `;
  });
  box.innerHTML = html;
})();
</script>