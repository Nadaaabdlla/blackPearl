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



});