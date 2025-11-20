    // Retrieve products
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartList = document.getElementById("cart-list");
    const clearBtn = document.getElementById("clear-cart");

    // Display products in the list
    if (cartItems.length === 0) {
        cartList.innerHTML = `
    <li style="list-style: none; padding: 50px; font-size: xx-large; font-weight: 900; text-align: center;">
      Empty
    </li>`;
    } else {
        cartItems.forEach((item) => {
            function pieces(num) {
                num = item.qty;
                return num == 1 ? "piece" : "pieces";
            }
            let li = document.createElement("li");
            li.innerHTML = `
         <a href="${item.link}" class="product-link">
         <strong>${item.name}</strong>
         </a>
         <span> - ${item.price} EGP</span>
         <span> - ${item.qty} ${pieces()}</span>
       `;

            cartList.appendChild(li);
        });
    }

    // Button to clear the entire cart
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cartItems"); // Remove from localStorage
        cartItems = []; // Clear the in-memory copy
        cartList.innerHTML = `<li style="list-style: none; padding: 50px; font-size: xx-large; font-weight: 900; text-align: center;">Empty</li>`;
        // alert("Cart cleared!");
        updateCartCount();
    });

    // Send cart items via WhatsApp
    document.getElementById("sendWhatsapp").addEventListener("click", () => {
        if (cartItems.length === 0) {
            alert("Cart is empty!");
            return;
        }

        // Format the message
        let message = "Shopping List:\n";
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            let itemTotal = item.price * item.qty; // total for each product
            totalPrice += itemTotal;

            message += `${index + 1}- *${item.name}* (${item.price} EGP × ${item.qty}) = ${itemTotal} EGP\n`;
        });

        message += `\n*Total Price*: ${totalPrice} EGP`; // add total at the end

        // WhatsApp number
        let phoneNumber = "2001022379431";

        // WhatsApp link
        let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


        // Open WhatsApp
        window.open(url, "_blank");
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
        };

    }
    // run update once when loading
    updateCartCount();
