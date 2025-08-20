// ===== Current Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  const toggleMenu = () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  };

  menuBtn.addEventListener("click", toggleMenu);

  // Close when clicking a link
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const clickInside = mobileNav.contains(e.target) || menuBtn.contains(e.target);
    if (!clickInside) {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== Smooth Scroll (for older browsers) =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href");
    if (!targetID || targetID === "#") return;

    const targetEl = document.querySelector(targetID);
    if (!targetEl) return;

    e.preventDefault();
    const y = targetEl.getBoundingClientRect().top + window.pageYOffset - 70; // account for sticky header
    window.scrollTo({ top: y, behavior: "smooth" });
  });
});

// ===== Reveal on Scroll =====
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      io.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

// ===== Subtle parallax for blobs (optional but pretty) =====
const blobs = document.querySelectorAll(".blob");
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY || window.pageYOffset;
      blobs.forEach((b, i) => {
        // Tiny translate to create depth
        const factor = (i + 1) * 0.04;
        b.style.transform = `translateY(${scrolled * factor}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});
