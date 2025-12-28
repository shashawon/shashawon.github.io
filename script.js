const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.getAttribute("href").slice(1);
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
    navLinks.forEach((link) => link.classList.remove("active"));
    a.classList.add("active");

    const navMenu = document.getElementById("navMenu");
    navMenu.classList.remove("active");
  });
});

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  },
  { threshold: 0.4, rootMargin: "-60px 0px -40% 0px" }
);

sections.forEach((s) => obs.observe(s));

const themeKey = "portfolio_theme";
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;

function applyTheme(t) {
  if (t === "dark") {
    root.setAttribute("data-theme", "dark");
    themeIcon.classList.remove("sun");
    themeIcon.classList.add("moon");
  } else {
    root.removeAttribute("data-theme");
    themeIcon.classList.remove("moon");
    themeIcon.classList.add("sun");
  }
}

const saved =
  localStorage.getItem(themeKey) ||
  (window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(saved);

themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(themeKey, next);
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("active") &&
    !navMenu.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navMenu.classList.remove("active");
  }
});

const form = document.getElementById("contactForm");
const result = document.getElementById("formResult");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nameField").value.trim();
  const email = document.getElementById("emailField").value.trim();
  const msg = document.getElementById("messageField").value.trim();

  if (!name || !email || !msg) {
    result.textContent = "Please fill all fields.";
    result.className = "error-msg";
    return;
  }

  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(
    "Name: " + name + "\nEmail: " + email + "\n\n" + msg
  );
  window.location.href = `mailto:sharonrose.ballera@evsu.edu.ph?subject=${subject}&body=${body}`;

  result.textContent = "Opening your email client...";
  result.className = "success-msg";
});

const projects = document.querySelectorAll(".proj");
const overlayBg = document.getElementById("overlayBg");
let activeCard = null;

projects.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!activeCard) {
      card.classList.add("enlarged");
      overlayBg.classList.add("active");
      activeCard = card;
    } else if (activeCard === card) {
      card.classList.remove("enlarged");
      overlayBg.classList.remove("active");
      activeCard = null;
    }
  });
});

overlayBg.addEventListener("click", () => {
  if (activeCard) {
    activeCard.classList.remove("enlarged");
    overlayBg.classList.remove("active");
    activeCard = null;
  }
});

document.addEventListener("click", (e) => {
  if (activeCard && !e.target.closest(".proj.enlarged")) {
    activeCard.classList.remove("enlarged");
    overlayBg.classList.remove("active");
    activeCard = null;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

document
  .querySelectorAll("nav a")
  .forEach((a) => a.setAttribute("tabindex", "0"));
