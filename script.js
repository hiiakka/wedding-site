// Календарь: август 2027 года начинается в воскресенье.
const calendarDays = document.getElementById("calendar-days");
for (let day = 1; day <= 31; day++) {
  const cell = document.createElement("span");
  cell.className = "day" + (day === 3 ? " heart-day" : "");
  cell.textContent = day;
  if (day === 3) cell.setAttribute("aria-label", "3 августа — наша свадьба");
  calendarDays.appendChild(cell);
}

const dressSlides = {
  women: [
    { src: "зел ж.jpg", alt: "Платье для свадебного гостя", caption: "Нежные пастельные оттенки" },
    { src: "кор ж.jpg", alt: "Элегантное вечернее платье", caption: "Лаконичный вечерний образ" },
    { src: "крас ж.png", alt: "Элегантный образ для торжества", caption: "Цветочный или романтичный образ" }
  ],
  men: [
    { src: "зел м.jpg", alt: "Классический мужской костюм", caption: "Классический костюм" },
    { src: "кор м.jpg", alt: "Мужской костюм для торжества", caption: "Спокойные природные оттенки" },
    { src: "крас м.png", alt: "Элегантный образ с пиджаком", caption: "Светлый пиджак и классические брюки" }
  ]
};
const slideIndexes = { women: 0, men: 0 };

function showDressSlide(group) {
  const slide = dressSlides[group][slideIndexes[group]];
  const image = document.getElementById(`${group}-image`);
  image.src = slide.src;
  image.alt = slide.alt;
  document.getElementById(`${group}-count`).textContent = `${slideIndexes[group] + 1} / ${dressSlides[group].length}`;
  document.getElementById(`${group}-caption`).textContent = slide.caption;
}
document.querySelectorAll("[data-carousel][data-step]").forEach(button => {
  button.addEventListener("click", () => {
    const group = button.dataset.carousel;
    const step = Number(button.dataset.step);
    slideIndexes[group] = (slideIndexes[group] + step + dressSlides[group].length) % dressSlides[group].length;
    showDressSlide(group);
  });
});

const wishes = [
  "Будем очень признательны, если Вы воздержитесь от криков «Горько». Ведь поцелуй - это знак выражения чувств, и он не может быть по заказу.",
  "Пожалуйста, не дарите нам цветы! Мы не успеем насладиться их красотой и ароматом. Если хотите подарить нам ценный и нужный подарок, мы будем очень благодарны за вклад в бюджет нашей молодой семьи.",
  "Для наших гостей мы предоставим жилье в загородных коттеджах. Не забудьте взять удобную одежду и купальники."
];
let wishIndex = 0;
const wishText = document.getElementById("wish-text");
const wishCount = document.getElementById("wish-count");
const wishDots = document.getElementById("wish-dots");

function renderWish() {
  wishText.textContent = wishes[wishIndex];
  wishCount.textContent = `${String(wishIndex + 1).padStart(2, "0")} / ${String(wishes.length).padStart(2, "0")}`;
  [...wishDots.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === wishIndex);
    dot.setAttribute("aria-pressed", i === wishIndex ? "true" : "false");
  });
}
wishes.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "dot";
  dot.setAttribute("aria-label", `Показать подсказку ${i + 1}`);
  dot.addEventListener("click", () => { wishIndex = i; renderWish(); });
  wishDots.appendChild(dot);
});
document.getElementById("wish-prev").addEventListener("click", () => {
  wishIndex = (wishIndex - 1 + wishes.length) % wishes.length;
  renderWish();
});
document.getElementById("wish-next").addEventListener("click", () => {
  wishIndex = (wishIndex + 1) % wishes.length;
  renderWish();
});
renderWish();
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach((item) => {
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}
const weddingDate = new Date(
  "2027-08-03T16:00:00+03:00"
).getTime();

function updateCountdown() {
  const remaining = Math.max(0, weddingDate - Date.now());

  const days = Math.floor(
    remaining / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (remaining / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (remaining / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (remaining / 1000) % 60
  );

  document.getElementById("count-days").textContent = days;
  document.getElementById("count-hours").textContent =
    String(hours).padStart(2, "0");
  document.getElementById("count-minutes").textContent =
    String(minutes).padStart(2, "0");
  document.getElementById("count-seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);