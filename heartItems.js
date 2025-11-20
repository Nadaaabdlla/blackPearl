  // Retrieve wishlist products
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  const cartList = document.getElementById("cart-list");
  const clearBtn = document.getElementById("clear-cart");

  if (wishlistItems.length === 0) {
      cartList.innerHTML = `
  <li style="list-style: none; padding: 50px; font-size: xx-large; font-weight: 900; text-align: center;">
    Empty
  </li>`;
  } else {
      // Display products
      wishlistItems.forEach(item => {
          let li = document.createElement("li");
          li.classList.add("wishlist-item");
          li.innerHTML = `
<a href="${item.link}" class="product-link">
<strong>${item.name}</strong>
</a>
`;

          cartList.appendChild(li);
      });

      // Button to clear wishlist
      clearBtn.addEventListener("click", () => {
          localStorage.removeItem("wishlistItems");
          cartList.innerHTML = `
  <li style="list-style: none; padding: 50px; font-size: xx-large; font-weight: 900; text-align: center;">
    Empty
  </li>`;
      });
      // Counter update
      function updateCartCount() {
          let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
          function cartCounter(cart) {
              let totalQty = 0;
              cart.forEach((item) => {
                  let piecesNum = Number(item.qty);
                  totalQty += piecesNum;
                  return totalQty;
              });
              return Number(totalQty);
          }
          let cartCount = document.querySelector("#cart-count");
          cartCount.textContent = Number(cartCounter(cart));
          if (cartCount.textContent >= 100) {
              cartCount.style.width = "max-content";
              cartCount.style.height = "max-content";
              cartCount.style.padding = "1px";
          } else {
              cartCount.style.width = "20px";
              cartCount.style.height = "20px";
              cartCount.style.padding = "0px";
          }
      }

      // run update once when loading
      updateCartCount();
  };