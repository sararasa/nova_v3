// Cambia logo quando si scrolla oltre la sezione "about"
window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  const logo = document.getElementById('logo-nova');
  const arrow = document.getElementById('logo-arrow');

  const aboutTop = aboutSection.getBoundingClientRect().top;

  if (aboutTop <= 100) {
    logo.classList.add('visible');
    logo.classList.remove('hidden');
    arrow.classList.add('hidden');
    arrow.classList.remove('visible');
  } else {
    logo.classList.add('hidden');
    logo.classList.remove('visible');
    arrow.classList.add('visible');
    arrow.classList.remove('hidden');
  }
});

// GALLERY CON PALLINI + AUTOPLAY

const slides = document.querySelectorAll('.slide');
let current = 0;
let interval;

// Crea pallini sotto la gallery
const dotsContainer = document.getElementById("gallery-dots");

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    stopAutoplay();
    current = i;
    showSlide(current);
    startAutoplay(); // opzionale
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".gallery-dots .dot");

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[current].classList.add("active");
}

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  updateDots();
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function startAutoplay() {
  interval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
  clearInterval(interval);
}

// Avvia autoplay
startAutoplay();

// Click su gallery = avanza di 1 slide e resetta autoplay
document.getElementById('gallery').addEventListener('click', () => {
  stopAutoplay();
  nextSlide();
  startAutoplay(); // opzionale
});

// MENU: evidenziazione dinamica sezione attiva, nessuna attiva su HERO
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section[id]");
  const hero = document.querySelector(".hero");
  const navLinks = document.querySelectorAll(".main-nav a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");

      // Se la HERO è visibile, rimuove tutti gli "active"
      if (entry.target.classList.contains("hero") && entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
      }

      // Se un'altra sezione è visibile, attiva la voce corrispondente
      if (entry.isIntersecting && id) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0
  });

  // Osserva tutte le sezioni e anche la hero
  sections.forEach(section => observer.observe(section));
  if (hero) observer.observe(hero);
});
