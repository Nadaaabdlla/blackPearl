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

  // ================== SHOPPING CART ==================
  const cartBtns = document.querySelectorAll(".cartBtn");
  const cartCount = document.getElementById("cart-count");

  // Load stored cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Update counter on page load
  cartCount.textContent = cartItems.length;

  cartBtns.forEach(btn => {
    const cartIcon = btn.querySelector("span");

    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const itemName = card.querySelector("h4").innerText;
      const itemPrice = card.querySelector("p").innerText;

      if (cartIcon.textContent.trim() === "add_shopping_cart") {
        // Add item to cart
        cartIcon.textContent = "remove_shopping_cart";
        cartItems.push({ name: itemName, price: itemPrice });
      } else {
        // Remove item from cart
        cartIcon.textContent = "add_shopping_cart";
        cartItems = cartItems.filter(item => item.name !== itemName);
      }

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update counter
      cartCount.textContent = cartItems.length;
    });
  });

  // ================== WISHLIST (HEARTS) ==================
  const heartBtns = document.querySelectorAll(".heartBtn");
  const mainHeartBtn = document.querySelector(".mainHeartBtn i");

  // Load wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Update main heart in navbar
  function updateMainHeart() {
    if (wishlist.length > 0) {
      mainHeartBtn.classList.replace("fa-regular", "fa-solid");
      mainHeartBtn.style.color = "rgb(255, 73, 73)";
    } else {
      mainHeartBtn.classList.replace("fa-solid", "fa-regular");
      mainHeartBtn.style.color = "black";
    }
  }

  // Color saved hearts on page load
  heartBtns.forEach(btn => {
    const card = btn.closest(".card");
    const itemName = card.querySelector("h4").innerText;
    const icon = btn.querySelector("i");

    if (wishlist.includes(itemName)) {
      btn.classList.add("active");
      icon.classList.replace("fa-regular", "fa-solid");
      icon.style.color = "rgb(255, 73, 73)";
    }

    btn.addEventListener("click", () => {
      if (wishlist.includes(itemName)) {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item !== itemName);
        btn.classList.remove("active");
        icon.classList.replace("fa-solid", "fa-regular");
        icon.style.color = "black";
      } else {
        // Add to wishlist
        wishlist.push(itemName);
        btn.classList.add("active");
        icon.classList.replace("fa-regular", "fa-solid");
        icon.style.color = "red";
      }

      // Update localStorage
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // Update navbar heart
      updateMainHeart();
    });
  });

  // Initial update for navbar heart
  updateMainHeart();


  // ================== SEARCH BAR ==================
  const searchInput = document.querySelector(".search_bar");
  const searchForm = document.querySelector("form[role='search']");

  let notFoundMsg = document.createElement("p");
  notFoundMsg.textContent = "Not Found";
  notFoundMsg.style.textAlign = "center";
  notFoundMsg.style.marginTop = "20px";
  notFoundMsg.style.display = "none";
  document.querySelector("#categoryContainer").appendChild(notFoundMsg);

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    let foundAny = false;

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (text.includes(query)) {
        card.style.display = "block";
        foundAny = true;
      } else {
        card.style.display = "none";
      }
    });

    notFoundMsg.style.display = foundAny ? "none" : "block";
  });

  // ================== HERO SLIDER ==================
  (function () {
    const track = document.querySelector(".slider-track");
    const slidesOriginal = Array.from(track.querySelectorAll(".hero-slide"));
    if (slidesOriginal.length === 0) return;

    // Clone first and last slides
    const firstClone = slidesOriginal[0].cloneNode(true);
    const lastClone = slidesOriginal[slidesOriginal.length - 1].cloneNode(true);
    firstClone.dataset.clone = "first";
    lastClone.dataset.clone = "last";
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);

    const slides = Array.from(track.querySelectorAll(".hero-slide"));

    // Create indicators
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

  // ================== CATEGORIES SCROLL ==================
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
      leftArrow.style.display = "block";
    } else {
      leftArrow.style.display = "none";
    }
  });

  // ================== CATEGORIES FILTER BUTTONS ==================
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
        if (filter === "all" || card.classList.contains(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});