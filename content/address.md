---
title: 收货地址管理
---

<h4>新增收货地址</h4>
<div>
  <input type="text" id="addrName" placeholder="收货人姓名"><br>
  <input type="text" id="addrPhone" placeholder="联系电话"><br>
  <input type="text" id="addrDetail" placeholder="详细地址"><br>
  <button onclick="saveNewAddr()">保存地址</button>
</div>

<hr>
<h4>已保存地址</h4>
<div id="addrList">加载中...</div>

<script>
// 新增地址提交
async function saveNewAddr(){
  const name = document.getElementById("addrName").value;
  const phone = document.getElementById("addrPhone").value;
  const detail = document.getElementById("addrDetail").value;
  if(!name || !phone || !detail) {
    alert("请填写完整地址信息");
    return;
  }
  await addAddress({name,phone,detail});
}

// 渲染地址列表
(async function(){
  if(!currentUser) {
    document.getElementById("addrList").innerHTML = "<p>请先 <a href='javascript:openLoginModal()'>登录</a></p>";
    return;
  }
  const list = await getAddressList();
  if(list.length === 0) {
    document.getElementById("addrList").innerHTML = "<p>暂无收货地址</p>";
    return;
  }
  let html = "";
  list.forEach(item => {
    html += `
      <div style="border:1px solid #ccc;padding:10px;margin:8px 0;">
        <p>${item.name} | ${item.phone}</p>
        <p>${item.detail}</p>
        ${item.isDefault ? "<span>默认地址</span>" : `<button onclick="setDefaultAddr('${item.id}')">设为默认</button>`}
        <button onclick="delAddress('${item.id}')">删除</button>
      </div>
    `;
  });
  document.getElementById("addrList").innerHTML = html;
})();
</script>