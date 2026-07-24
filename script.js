"use strict";

document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Mobile navigation
function closeNavigation() {
  if (!navigation || !navToggle) return;
  navigation.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");
}

navToggle?.addEventListener("click", () => {
  const willOpen = !navigation.classList.contains("open");
  navigation.classList.toggle("open", willOpen);
  navToggle.setAttribute("aria-expanded", String(willOpen));
  navToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

document.addEventListener("click", (event) => {
  if (!navigation?.classList.contains("open")) return;
  if (!header?.contains(event.target)) closeNavigation();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1020) closeNavigation();
});

// Smooth scrolling with sticky-header offset
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const headerHeight = header?.offsetHeight ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });
    history.replaceState(null, "", targetId);
  });
});

// Active-section navigation
const navigationSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNavigation() {
  const offset = (header?.offsetHeight ?? 0) + 90;
  let activeSection = navigationSections[0];

  navigationSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) activeSection = section;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSection?.id}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

let scrollFrame;
window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      updateActiveNavigation();
      scrollFrame = null;
    });
  },
  { passive: true }
);
updateActiveNavigation();

// Subtle scroll reveal
const revealItems = document.querySelectorAll(".reveal");
if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

// Missing-image fallbacks
function showImageFallback(image) {
  image.classList.add("image-missing");
  const fallback = image.nextElementSibling;
  if (fallback?.classList.contains("image-fallback")) fallback.classList.add("visible");
}

document.querySelectorAll("[data-fallback-image]").forEach((image) => {
  image.addEventListener("error", () => showImageFallback(image), { once: true });
  if (image.complete && image.naturalWidth === 0) showImageFallback(image);
});

// Accessible project modal
const modal = document.querySelector("[data-modal]");
const modalDialog = modal?.querySelector(".modal-dialog");
const modalContent = modal?.querySelector("[data-modal-content]");
const modalOpeners = document.querySelectorAll("[data-modal-open]");
const modalClosers = modal?.querySelectorAll("[data-modal-close]") ?? [];
let returnFocus = null;

function getFocusableElements() {
  if (!modalDialog) return [];
  return [...modalDialog.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter((element) => !element.hasAttribute("hidden"));
}

function openModal(templateId, trigger) {
  const template = document.getElementById(templateId);
  if (!modal || !modalDialog || !modalContent || !(template instanceof HTMLTemplateElement)) return;

  returnFocus = trigger;
  modalContent.replaceChildren(template.content.cloneNode(true));
  modal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => modalDialog.focus());
}

function closeModal() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  modalContent?.replaceChildren();
  returnFocus?.focus();
  returnFocus = null;
}

modalOpeners.forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.modalOpen, button));
});

modalClosers.forEach((button) => button.addEventListener("click", closeModal));

document.addEventListener("keydown", (event) => {
  if (!modal || modal.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key !== "Tab") return;
  const focusable = getFocusableElements();
  if (!focusable.length) {
    event.preventDefault();
    modalDialog?.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const focusIsInsideDialog = modalDialog?.contains(document.activeElement);

  if (!focusIsInsideDialog) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && (document.activeElement === first || document.activeElement === modalDialog)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// Mailto contact form; no data is sent to a backend.
const contactForm = document.querySelector("[data-contact-form]");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`;
  window.location.href = `mailto:noahchen482@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Automatic footer year
const yearElement = document.querySelector("[data-current-year]");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
