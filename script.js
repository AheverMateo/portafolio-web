/* ============================================================
   Menú móvil
   ============================================================ */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

function setMenuState(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  navMenu.classList.toggle("open", open);
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) setMenuState(false);
  });
}

/* ============================================================
   Header al hacer scroll + back-to-top
   ============================================================ */
const siteHeader = document.getElementById("site-header");
const backToTop = document.getElementById("back-to-top");

function onScroll() {
  if (siteHeader) siteHeader.classList.toggle("scrolled", window.scrollY > 10);
  if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================================
   Resaltar sección activa en la navegación
   ============================================================ */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-container a");

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ============================================================
   Animaciones de aparición al hacer scroll
   ============================================================ */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ============================================================
   Formulario de contacto (mailto)
   ============================================================ */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const CONTACT_EMAIL = "brandonahumada804@gmail.com";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("contact-email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      formStatus.textContent = "Ingresá tu correo para poder responderte.";
      return;
    }

    if (!emailRegex.test(email)) {
      formStatus.textContent = "Ese correo no parece válido. Revisalo.";
      return;
    }

    const subject = encodeURIComponent("Contacto desde tu portafolio");
    const body = encodeURIComponent(
      `Hola Hever,\n\nMe puse en contacto desde tu portafolio. Mi correo es ${email}.\n\nSaludos.`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    formStatus.textContent = "Abriendo tu cliente de correo...";
  });
}

/* ============================================================
   Año dinámico en el footer
   ============================================================ */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();