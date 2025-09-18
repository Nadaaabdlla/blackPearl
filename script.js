const heartBtn = document.getElementById("heartBtn");
const heartIcon = heartBtn.querySelector("i");

heartBtn.addEventListener("click", () => {
    heartIcon.classList.toggle("fa-regular");
    heartIcon.classList.toggle("fa-solid");
});
  const cartBtn = document.getElementById("cartBtn");
  const cartIcon = cartBtn.querySelector("span");

  cartBtn.addEventListener("click", () => {
    if (cartIcon.textContent.trim() === "add_shopping_cart") {
      cartIcon.textContent = "remove_shopping_cart";
    } else {
      cartIcon.textContent = "add_shopping_cart";
    }
  });
