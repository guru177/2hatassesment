// ---------- Counter animation ----------
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

function formatNumber(value, mode, decimals) {
  if (mode === "comma") return Math.round(value).toLocaleString("en-US");

  if (mode === "k") {
    const v = Math.round(value);
    if (v >= 1000) return (v / 1000).toFixed(1).replace(/\.0$/, "");
    return String(v);
  }

  if (mode === "decimal") {
    const d = Number.isFinite(decimals) ? decimals : 2;
    return Number(value).toFixed(d);
  }

  return String(Math.round(value));
}

function animateCounter(el) {
  const target = Number(el.dataset.target || 0);
  const duration = Number(el.dataset.duration || 2600);
  const mode = el.dataset.format || ""; // "", "comma", "k", "decimal"
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || "";

  const startValue = 0;
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = easeInOutSine(t);

    const current = startValue + (target - startValue) * eased;
    el.textContent = formatNumber(current, mode, decimals) + suffix;

    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const seen = new WeakSet();
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll("[data-counter]").forEach((el) => io.observe(el));


// ---------- Mobile menu ----------
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("mobileMenu");

const closeMenu = () => {
  menu.classList.add("hidden");
  btn.setAttribute("aria-expanded", "false");
};

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isHidden = menu.classList.contains("hidden");

  if (isHidden) {
    menu.classList.remove("hidden");
    btn.setAttribute("aria-expanded", "true");
  } else {
    closeMenu();
  }
});

// close when clicking outside
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
});

// close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
