window.addEventListener("load", () => {
  // ❤️ زرار الـ heart
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

  // 🛒 زرار الكارت
  const cartBtns = document.querySelectorAll(".cartBtn");
  cartBtns.forEach(btn => {
    const cartIcon = btn.querySelector("span");
    btn.addEventListener("click", () => {
      if (cartIcon.textContent.trim() === "add_shopping_cart") {
        cartIcon.textContent = "remove_shopping_cart";
      } else {
        cartIcon.textContent = "add_shopping_cart";
      }
    });
  });

  // 👇 جروب الأزرار
  const btnGroup = document.querySelector(".btn-group");
  
    const btns = btnGroup.querySelectorAll(".btn");

    btns.forEach(button => {
      button.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
      });
    });
  
});
