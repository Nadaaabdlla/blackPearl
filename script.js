window.addEventListener("load", () => {
  const heartBtns = document.querySelectorAll(".heartBtn");
  heartBtns.forEach(btn => {
    const heartIcon = btn.querySelector("i");
    btn.addEventListener("click", () => {
      heartIcon.classList.toggle("fa-regular");
      heartIcon.classList.toggle("fa-solid");
      if (heartIcon.classList.contains("fa-solid")) {
        heartIcon.style="color:gold";
      }else{
        heartIcon.style="color:black";
      }
    });
  });

  const cards = document.querySelectorAll(".card");
const btnGroup = document.querySelector(".btn-group");
const btns = btnGroup.querySelectorAll(".btn");

btns.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); 
    btns.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.innerText.trim().toLowerCase();
    cards.forEach(card => {
      if (filter==="all" || card.classList.contains(filter)) {
        card.classList.remove("hidden"); 
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

const cartBtns = document.querySelectorAll(".cartBtn");
const cartCount = document.getElementById("cart-count");

// تحميل العناصر المخزنة من localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// تحديث العدد عند فتح الصفحة
cartCount.textContent = cartItems.length;

cartBtns.forEach(btn => {
  const cartIcon = btn.querySelector("span");

  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const itemName = card.querySelector("h4").innerText; // اسم المنتج

    if (cartIcon.textContent.trim() === "add_shopping_cart") {
      // ✅ إضافة العنصر للسلة
      cartIcon.textContent = "remove_shopping_cart";
      cartItems.push(itemName);
    } else {
      // ❌ إزالة العنصر من السلة
      cartIcon.textContent = "add_shopping_cart";
      cartItems = cartItems.filter(item => item !== itemName);
    }

    // تحديث localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // تحديث العدد في الناف بار
    cartCount.textContent = cartItems.length;
  });
});
const categories = document.querySelector(".categories");
const leftArrow = document.querySelector("#leftBtn");
const rightArrow = document.querySelector(".arrow.right");

rightArrow.addEventListener("click", () => {
  categories.scrollBy({ left: 150, behavior: "smooth" });
});

leftArrow.addEventListener("click", () => {
  categories.scrollBy({ left: -150, behavior: "smooth" });
});

categories.addEventListener("scroll", () => {
  if (categories.scrollLeft > 0) {
    leftBtn.style.display = "block";
  } else {
    leftBtn.style.display = "none";
  }
});


});