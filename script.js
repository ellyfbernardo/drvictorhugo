// Número de WhatsApp do consultório (somente dígitos, com DDI 55 + DDD).
// TODO: substituir pelo número real.
const WHATSAPP = "5584000000000";

const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

// Navegação: fundo ao rolar
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  links.classList.toggle("open");
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.classList.remove("open");
    links.classList.remove("open");
  })
);

// Animações de entrada
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  io.observe(el);
});

// Contadores
const counter = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.count;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1800, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counter.unobserve(el);
    }),
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));

// WhatsApp flutuante
document.getElementById("whatsFloat").href =
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá, Dr. Victor Hugo! Gostaria de agendar uma avaliação.")}`;
document.getElementById("whatsFloat").target = "_blank";

// Formulário → WhatsApp
document.getElementById("contactForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const d = new FormData(ev.target);
  const msg =
    `Olá, Dr. Victor Hugo! Meu nome é ${d.get("nome")}.\n` +
    `Tenho interesse em: ${d.get("interesse")}.\n` +
    `Telefone: ${d.get("telefone")}\n` +
    (d.get("mensagem") ? `\n${d.get("mensagem")}` : "");
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

document.getElementById("year").textContent = new Date().getFullYear();
