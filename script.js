window.addEventListener("load", () => {
  // const heartBtns = document.querySelectorAll(".heartBtn");
  // heartBtns.forEach(btn => {
  //   const heartIcon = btn.querySelector("i");
  //   btn.addEventListener("click", () => {
  //     heartIcon.classList.toggle("fa-regular");
  //     heartIcon.classList.toggle("fa-solid");
  //     if (heartIcon.classList.contains("fa-solid")) {
  //       heartIcon.style="color:gold";
  //     }else{
  //       heartIcon.style="color:black";
  //     }
  //   });
  // });

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

// عناصر المفضلة
const heartBtns = document.querySelectorAll(".heartBtn");
const mainHeartBtn = document.querySelector(".mainHeartBtn i");

// استرجاع المفضلة من localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// دالة لتحديث حالة القلب اللي فوق في الـ Navbar
function updateMainHeart() {
  if (wishlist.length > 0) {
    mainHeartBtn.classList.replace("fa-regular", "fa-solid");
    mainHeartBtn.style.color = "rgb(255, 73, 73)";
  } else {
    mainHeartBtn.classList.replace("fa-solid", "fa-regular");
    mainHeartBtn.style.color = "black";
  }
}

// أول ما الصفحة تفتح → لوّن القلوب اللي اتحفظت
heartBtns.forEach(btn => {
  const card = btn.closest(".card");
  const itemName = card.querySelector("h4").innerText; // اسم المنتج

  const icon = btn.querySelector("i");

  if (wishlist.includes(itemName)) {
    btn.classList.add("active");
    icon.classList.replace("fa-regular", "fa-solid");
    icon.style.color = "rgb(255, 73, 73)";
  }

  // عند الضغط على القلب
  btn.addEventListener("click", () => {
    if (wishlist.includes(itemName)) {
      // لو موجود → اشيله
      wishlist = wishlist.filter(item => item !== itemName);
      btn.classList.remove("active");
      icon.classList.replace("fa-solid", "fa-regular");
      icon.style.color = "black";
    } else {
      // لو مش موجود → اضيفه
      wishlist.push(itemName);
      btn.classList.add("active");
      icon.classList.replace("fa-regular", "fa-solid");
      icon.style.color = "red";
    }

    // تحديث localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // تحديث القلب اللي فوق
    updateMainHeart();
  });
});

// أول تحديث عند تحميل الصفحة
updateMainHeart();
// ====== INFINITE SLIDER (clone technique) ======
(function () {
  const track = document.querySelector(".slider-track");
  const slidesOriginal = Array.from(track.querySelectorAll(".hero-slide"));
  if (slidesOriginal.length === 0) return;

  // عمل clone لأول وآخر
  const firstClone = slidesOriginal[0].cloneNode(true);
  const lastClone = slidesOriginal[slidesOriginal.length - 1].cloneNode(true);
  firstClone.dataset.clone = "first";
  lastClone.dataset.clone = "last";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  // الآن نحصل على كل السلايدات بعد ال-clone
  const slides = Array.from(track.querySelectorAll(".hero-slide"));

  // indicators بناء على عدد السلايدات الأصلية
  const indicatorsContainer = document.querySelector(".indicators");
  const realCount = slidesOriginal.length;
  let dots = [];
  for (let i = 0; i < realCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    indicatorsContainer.appendChild(dot);
    dots.push(dot);
    // click على الدوت
    dot.addEventListener("click", () => {
      stopAuto(); // لو بتحبي توقف مؤقتًا
      goToSlide(i + 1); // +1 لأننا بعد الـ lastClone البداية فعليًا عند index 1
      startAuto();
    });
  }

  // index يبدأ عند 1 (أول سلايد الحقيقي موجود بعد cloned-last)
  let index = 1;
  const slideWidthPercent = 100; // كل سلايد بعرض 100%
  // set initial transform
  track.style.transform = `translateX(-${index * slideWidthPercent}%)`;

  // تحديث الدوتس
  function updateDots() {
    // index 1..realCount map to dots[0..realCount-1]
    let active = index - 1;
    if (active < 0) active = realCount - 1;
    if (active >= realCount) active = 0;
    dots.forEach((d, i) => d.classList.toggle("active", i === active));
  }

  // الانتقال لسلايد معين (index داخل مصفوفة slides)
  function goToSlide(targetIndex) {
    track.style.transition = "transform 0.8s ease-in-out";
    index = targetIndex;
    track.style.transform = `translateX(-${index * slideWidthPercent}%)`;
    updateDots();
  }

  // next / prev
  function nextSlide() { goToSlide(index + 1); }
  function prevSlide() { goToSlide(index - 1); }

  // بعد انتهاء أي transition نتحقق لو وصلنا clones -> نغير بدون transition
  track.addEventListener("transitionend", () => {
    const current = slides[index];
    if (current && current.dataset.clone === "first") {
      // لو وصلنا clone لأول سلايد، نرجع للأصلية (index = 1) بدون transition
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(-${index * slideWidthPercent}%)`;
    } else if (current && current.dataset.clone === "last") {
      // لو وصلنا clone لآخر سلايد، نرجع للأصلية (index = slides.length - 2)
      track.style.transition = "none";
      index = slides.length - 2;
      track.style.transform = `translateX(-${index * slideWidthPercent}%)`;
    }
    updateDots();
  });

  // أسهم
  const nextBtn = document.querySelector(".hero-arrow.next");
  const prevBtn = document.querySelector(".hero-arrow.prev");
  nextBtn && nextBtn.addEventListener("click", () => { stopAuto(); nextSlide(); startAuto(); });
  prevBtn && prevBtn.addEventListener("click", () => { stopAuto(); prevSlide(); startAuto(); });

  // autoplay
  let autoTimer = null;
  function startAuto() {
    if (autoTimer) return;
    autoTimer = setInterval(() => {
      nextSlide();
    }, 3000);
  }
  function stopAuto() {
    if (!autoTimer) return;
    clearInterval(autoTimer);
    autoTimer = null;
  }

  // pause on hover (اختياري لراحة المستخدم)
  const sliderWindow = document.querySelector(".slider-window");
  sliderWindow.addEventListener("mouseenter", stopAuto);
  sliderWindow.addEventListener("mouseleave", startAuto);

  // تشغيل افتراضي
  startAuto();
})();

// البحث
const searchInput = document.querySelector(".search_bar");
const searchForm = document.querySelector("form[role='search']");
// رسالة not found
let notFoundMsg = document.createElement("p");
notFoundMsg.textContent = "Not Found";
notFoundMsg.style.textAlign = "center";
notFoundMsg.style.marginTop = "20px";
notFoundMsg.style.display = "none"; // نخفيها في الأول
document.querySelector("#categoryContainer").appendChild(notFoundMsg);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // منع ريفريش الصفحة
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

  // لو مالقاش حاجة
  if (!foundAny) {
    notFoundMsg.style.display = "block";
  } else {
    notFoundMsg.style.display = "none";
  }
});

});