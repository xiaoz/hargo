---
title: Address Management
---

## Add New Address
 <!-- Add new address -->
  <div style="margin:2rem 0;max-width:600px;">
    <div style="margin-bottom:1rem;">
      <input type="text" id="addrName" placeholder="Recipient Name" style="width:100%;padding:8px;border:1px solid
  #D1D1D1;outline:none;border-radius:4px;">
    </div>
    <div style="margin-bottom:1rem;">
      <input type="text" id="addrPhone" placeholder="Phone Number" style="width:100%;padding:8px;border:1px solid
  #D1D1D1;outline:none;border-radius:4px;">
    </div>
    <div style="margin-bottom:1rem;">
      <input type="text" id="addrDetail" placeholder="Full Address" style="width:100%;padding:8px;border:1px solid
  #D1D1D1;outline:none;border-radius:4px;">
    </div>
    <button onclick="saveNewAddr()" class="btn btn-primary" style="padding:6px 16px;">Save Address</button>
  </div>

<hr>

## Saved Addresses

<div id="addrList" style="margin:2rem 0;"></div>

<script>
async function saveNewAddr(){
  let name = document.getElementById("addrName").value.trim();
  let phone = document.getElementById("addrPhone").value.trim();
  let detail = document.getElementById("addrDetail").value.trim();
  if(!name || !phone || !detail) return alert("Please fill in all information");
  await addAddress({name,phone,detail});
}

(async function(){
  let box = document.getElementById("addrList");
  if(!currentUser){
    box.innerHTML = '<p>Please <a href="javascript:openLoginModal()">login</a> first</p>';
    return;
  }
  let list = await getAddressList();
  if(list.length === 0){
    box.innerHTML = '<p>No addresses saved yet</p>';
    return;
  }
  let html = "";
  list.forEach(item => {
    html += `
    <div style="padding:1rem 0;border-bottom:1px solid #eee;">
      <p style="margin:0;">${item.name} | ${item.phone} ${item.isDefault ? " <strong>Default</strong>" : ""}</p>
      <p style="margin:0.5rem 0;">${item.detail}</p>
      <div style="margin-top:0.8rem;">
        ${!item.isDefault ? `<button onclick="setDefaultAddr('${item.id}')" class="btn btn-outline-primary" style="padding:4px 12px;font-size:14px;">Set as Default</button>` : ""}
        <button onclick="delAddress('${item.id}')" class="btn btn-outline-primary" style="padding:4px 12px;font-size:14px;">Delete</button>
      </div>
    </div>
    `;
  });
  box.innerHTML = html;
})();
</script>