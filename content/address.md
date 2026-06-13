---
title: Address Management
---

## Add New Address

<div style="margin:2rem 0;max-width:720px;">
  <div style="margin-bottom:1rem;">
    <input type="text" id="addrName" placeholder="Recipient Name" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
  </div>
  <div style="margin-bottom:1rem;">
    <input type="text" id="addrPhone" placeholder="Phone Number" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
    <input type="text" id="addrCountry" placeholder="Country / Region" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
    <input type="text" id="addrState" placeholder="State / Province" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
    <input type="text" id="addrCity" placeholder="City" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
    <input type="text" id="addrPostalCode" placeholder="Postal Code" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
  </div>
  <div style="margin-bottom:1rem;">
    <input type="text" id="addrAddress1" placeholder="Address Line 1" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
  </div>
  <div style="margin-bottom:1rem;">
    <input type="text" id="addrAddress2" placeholder="Address Line 2 (optional)" style="width:100%;padding:8px;border:1px solid #D1D1D1;outline:none;border-radius:4px;">
  </div>
  <button onclick="saveNewAddr()" class="btn btn-primary" style="padding:6px 16px;">Save Address</button>
</div>

<hr>

## Saved Addresses

<div id="addrList" style="margin:2rem 0;"></div>

<script>
async function saveNewAddr(){
  const addr = {
    name: document.getElementById("addrName").value.trim(),
    phone: document.getElementById("addrPhone").value.trim(),
    country: document.getElementById("addrCountry").value.trim(),
    state: document.getElementById("addrState").value.trim(),
    city: document.getElementById("addrCity").value.trim(),
    postalCode: document.getElementById("addrPostalCode").value.trim(),
    address1: document.getElementById("addrAddress1").value.trim(),
    address2: document.getElementById("addrAddress2").value.trim()
  };

  if(!addr.name || !addr.phone || !addr.country || !addr.city || !addr.postalCode || !addr.address1) {
    return alert("Please fill in recipient, phone, country, city, postal code and address line 1");
  }

  await addAddress(addr);
}

function renderAddressList() {
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
        <p style="margin:0;font-weight:600;">${item.name} | ${item.phone} ${item.isDefault ? " <strong class='text-primary'>Default</strong>" : ""}</p>
        <p style="margin:0.5rem 0;color:#555;">
          ${item.address1}${item.address2 ? ", " + item.address2 : ""}<br>
          ${item.city}${item.state ? ", " + item.state : ""} ${item.postalCode}<br>
          ${item.country}
        </p>
        <div style="margin-top:0.8rem;">
          ${!item.isDefault ? `<button onclick="setDefaultAddr('${item.id}')" class="btn btn-outline-primary" style="padding:4px 12px;font-size:14px;">Set as Default</button>` : ""}
          <button onclick="delAddress('${item.id}')" class="btn btn-outline-primary" style="padding:4px 12px;font-size:14px;">Delete</button>
        </div>
      </div>
      `;
    });
    box.innerHTML = html;
  })();
}

if (typeof auth !== 'undefined') {
  auth.onAuthStateChanged(user => {
    currentUser = user;
    renderAddressList();
  });
} else {
  setTimeout(() => {
    if (typeof auth !== 'undefined') {
      auth.onAuthStateChanged(user => {
        currentUser = user;
        renderAddressList();
      });
    } else {
      console.error('Firebase Auth not initialized');
    }
  }, 1000);
}
</script>
