// ================== SELECTORS ==================
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productDescription = document.querySelector("#productDescription");
const productType = document.querySelector("#productType");
const productTypeOPTG = document.querySelector("#productTypeOPTG");
const submitBtn = document.querySelector("#submit");
const saleSelectedYes = document.querySelector('input[value="yes"]');
const saleSelectedNo = document.querySelector('input[value="no"]');
const productImg = document.querySelector('input[type="file"]');
// const fileInput = document.getElementById('fileInput');
// const previewImg = document.getElementById('previewImg');
// ================== IMG UPLOADING ==================
// fileInput.addEventListener('change', () => {
//     const file = fileInput.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             previewImg.src = e.target.result;
//             previewImg.style.display = 'block';
//         };
//         reader.readAsDataURL(file);
//     } else {
//         previewImg.src = '';
//         previewImg.style.display = 'none';
//     }
// });
// ================== SUBMIT ==================
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (saleSelectedYes) {
        // Format the message
        let message = ` 
        <div class="card ${productType.value} lazy-div">
          <div class="offerBanner">Sale</div>
              <img data-src="IMG PATH" class=" card-img-top lazy-img" alt="...">
               <div class="card-body">
              <div class="card-bodytext">
                  <h4 class="card-text">${productName.value}</h4>
                  <p class="card-text">Price: ${productPrice.value} EGP</p>
              </div>
           </div>
       </div>\n`;
       let imageUrl= document.querySelector("#imgLink").value;
        // WhatsApp number
        let phoneNumber = "2001557354982";
        // WhatsApp link
        let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message+ " " + imageUrl)}`;
        // Open WhatsApp
        window.open(url, "_blank");
    } else {
        // Format the message
        let message = ` 
        <div class="card ${productType.value} lazy-div">
              <img data-src="IMG PATH" class=" card-img-top lazy-img" alt="...">
            <div class="card-body">
              <div class="card-bodytext">
                 <h4 class="card-text">${productName.value}</h4>
                 <p class="card-text">Price: ${productPrice.value} EGP</p>
              </div>
           </div>
        </div>\n`;
        let imageUrl= document.querySelector("#imgLink").value;
        // WhatsApp number
        let phoneNumber = "2001557354982";
        // WhatsApp link
        let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message+ " " + imageUrl)}`;
        // Open WhatsApp
        window.open(url, "_blank");
    }
});