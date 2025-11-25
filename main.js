/* ==========================================
   BACK TO TOP BUTTON
========================================== */
const backToTopBtn = document.createElement("button");
backToTopBtn.classList.add("backToTop");
backToTopBtn.innerText = "⬆";
document.body.appendChild(backToTopBtn);

// показываем кнопку при скролле
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// плавный скролл вверх
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================
   CART COUNTER (ADD TO CART)
========================================== */
let cartCount = 0;

const buyButtons = document.querySelectorAll(".buy_button");

if (buyButtons.length > 0) {
    buyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            cartCount++;
            alert(`Produs adăugat în coș! Total: ${cartCount}`);
        });
    });
}

/* ==========================================
   RANDOM QUOTE GENERATOR (OPTIONAL)
========================================== */
const quotes = [
    "Călătoria este singurul lucru pe care îl cumperi și te face mai bogat.",
    "Lumea este o carte, iar cei care nu călătoresc citesc doar o pagină.",
    "Vacanțele sunt investiții în amintiri.",
    "Explorarea este motorul dezvoltării personale."
];

const quoteBtn = document.getElementById("quoteBtn");
const quoteText = document.getElementById("quoteText");

if (quoteBtn && quoteText) {
    quoteBtn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.innerText = quotes[randomIndex];
    });
}

/* ==========================================
   SLIDER (OPTIONAL)
========================================== */
let slideIndex = 0;

function startSlider() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    slides.forEach(s => s.style.display = "none");

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].style.display = "block";
    setTimeout(startSlider, 3000);
}

startSlider();
