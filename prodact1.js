window.addEventListener("load", () => {
    // ================== NAVBAR CLOSING ==================
    const offcanvasEl = document.getElementById("offcanvasNavbar");
    offcanvasEl.addEventListener("click", (e) => {
        const link = e.target.closest("a[data-bs-dismiss='offcanvas']");
        if (link) {
            e.preventDefault();
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            bsOffcanvas.hide();
            setTimeout(() => {
                window.location.href = link.getAttribute("href");
            }, 300);
        }
    });
    // ================== HERO SLIDER ==================
    (function () {
        const track = document.querySelector(".slider-track");
        const slidesOriginal = Array.from(track.querySelectorAll(".hero-slide"));
        if (slidesOriginal.length === 0) return;

        const firstClone = slidesOriginal[0].cloneNode(true);
        const lastClone = slidesOriginal[slidesOriginal.length - 1].cloneNode(true);
        firstClone.dataset.clone = "first";
        lastClone.dataset.clone = "last";
        track.appendChild(firstClone);
        track.insertBefore(lastClone, track.firstChild);

        const slides = Array.from(track.querySelectorAll(".hero-slide"));
        const indicatorsContainer = document.querySelector(".indicators");
        const realCount = slidesOriginal.length;
        let dots = [];

        for (let i = 0; i < realCount; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            indicatorsContainer.appendChild(dot);
            dots.push(dot);

            dot.addEventListener("click", () => {
                stopAuto();
                goToSlide(i + 1);
                startAuto();
            });
        }

        let index = 1;
        const slideWidthPercent = 100;
        track.style.transform = `translateX(-${index * slideWidthPercent}%)`;

        function updateDots() {
            let active = index - 1;
            if (active < 0) active = realCount - 1;
            if (active >= realCount) active = 0;
            dots.forEach((d, i) => d.classList.toggle("active", i === active));
        }

        function goToSlide(targetIndex) {
            track.style.transition = "transform 0.8s ease-in-out";
            index = targetIndex;
            track.style.transform = `translateX(-${index * slideWidthPercent}%)`;
            updateDots();
        }

        function nextSlide() { goToSlide(index + 1); }
        function prevSlide() { goToSlide(index - 1); }

        track.addEventListener("transitionend", () => {
            const current = slides[index];
            if (current && current.dataset.clone === "first") {
                track.style.transition = "none";
                index = 1;
                track.style.transform = `translateX(-${index * slideWidthPercent}%)`;
            } else if (current && current.dataset.clone === "last") {
                track.style.transition = "none";
                index = slides.length - 2;
                track.style.transform = `translateX(-${index * slideWidthPercent}%)`;
            }
            updateDots();
        });

        const nextBtn = document.querySelector(".hero-arrow.next");
        const prevBtn = document.querySelector(".hero-arrow.prev");
        nextBtn && nextBtn.addEventListener("click", () => { stopAuto(); nextSlide(); startAuto(); });
        prevBtn && prevBtn.addEventListener("click", () => { stopAuto(); prevSlide(); startAuto(); });

        let autoTimer = null;
        function startAuto() {
            if (autoTimer) return;
            autoTimer = setInterval(() => { nextSlide(); }, 3000);
        }
        function stopAuto() {
            if (!autoTimer) return;
            clearInterval(autoTimer);
            autoTimer = null;
        }

        const sliderWindow = document.querySelector(".slider-window");
        sliderWindow.addEventListener("mouseenter", stopAuto);
        sliderWindow.addEventListener("mouseleave", startAuto);

        startAuto();
    })();

    // ================== LAZY LOADING (IMG) ==================
    document.addEventListener("DOMContentLoaded", () => {
        const lazyImages = document.querySelectorAll("img.lazy-img");
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.addEventListener("load", () => {
                        img.classList.add("loaded");
                    });
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    });
    // ================== LAZY LOADING (CARDS) ==================
    document.addEventListener("DOMContentLoaded", () => {
        const lazyDivs = document.querySelectorAll(".lazy-div");
        const divObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const div = entry.target;
                    div.classList.add("visible");
                    observer.unobserve(div);
                }
            });
        });
        lazyDivs.forEach(div => {
            divObserver.observe(div);
        });
    });
});
// ================= CARTCOUNTER =================
document.addEventListener("DOMContentLoaded", () => {
    // ================= SELECTORS =================
    const addToCartBtn = document.getElementById("sendWhatsapp");
    const cartCount = document.getElementById("cart-count");
    const decreaseBtn = document.getElementById("decreaseBtn");
    const increaseBtn = document.getElementById("increaseBtn");
    const qtyInput = document.getElementById("qtyInput");

    const MIN_QTY = 0;
    const MAX_QTY = 100;

    function normalizeQty(value) {
        let n = parseInt(value, 10);
        if (isNaN(n)) n = MIN_QTY;
        if (n < MIN_QTY) n = MIN_QTY;
        if (n > MAX_QTY) n = MAX_QTY;
        return n;
    }

    function updateButtons(qty) {
        decreaseBtn.disabled = qty <= MIN_QTY;
        increaseBtn.disabled = qty >= MAX_QTY;
    }

    qtyInput.addEventListener("change", () => {
        const qty = normalizeQty(qtyInput.value);
        qtyInput.value = qty;
        updateButtons(qty);
    });

    decreaseBtn.addEventListener("click", () => {
        let qty = normalizeQty(qtyInput.value) - 1;
        qty = normalizeQty(qty);
        qtyInput.value = qty;
        updateButtons(qty);
    });

    increaseBtn.addEventListener("click", () => {
        let qty = normalizeQty(qtyInput.value) + 1;
        qty = normalizeQty(qty);
        qtyInput.value = qty;
        updateButtons(qty);
    });
    // Initialize buttons
    updateButtons(parseInt(qtyInput.value, 10));

    // PRODUCT DETAILS
    const productName = document.querySelector("h4.card-text").textContent;
    const productPrice = document.querySelector(".newPrice").textContent.replace("Price: ", "").replace(" EGP", "");

    // ================= ADD TO CART =================
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.innerText = message;
        toast.classList.add("show");
        toast.style.backgroundColor="#3b214d";
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000); // 3 seconds
    }
    function showAlert(message) {
        const toast = document.getElementById("toast");
        toast.innerText = message;
        toast.classList.add("show");
        toast.style.backgroundColor="#db2d2d";
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000); // 3 seconds
    }
    addToCartBtn.addEventListener("click", () => {
        showToast("Product added to your cart, you can view it now!");
        const quantity = parseInt(qtyInput.value);
        if (quantity == 0) {
            // alert("You can't add nothing to the cart");
            showAlert("You can't add nothing to the cart");
        } else {
            let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
            cart.push({
                name: productName,
                price: Number(productPrice),
                qty: quantity,
                link: window.location.href,
            });
            localStorage.setItem("cartItems", JSON.stringify(cart));
            updateCartCount();
            qtyInput.value -= qtyInput.value;
        }
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
     // ================= WISHLIST =================
     const addToWishlistBtn = document.getElementById("addToWishlist");
    addToWishlistBtn.addEventListener("click", () => {
        let wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];

        // avoid duplicates
        const exists = wishlist.some(item => item.name === productName);
        if (!exists) {
            wishlist.push({
                name: productName,
                price: Number(productPrice),
                link: window.location.href
            });

            localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
           // alert("Product added to wishlist ❤️");
           showToast("Product added to wishlist, you can view it now!");
        } else {
            // alert("This product is already in your wishlist!");
            showAlert("This product is already in your wishlist!");

        }

    });

});
