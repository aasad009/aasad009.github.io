(() => {
  "use strict";

  // Publication-page BibTeX copy button.
  document.addEventListener("click", async (event) => {
    const button = event.target.closest('[data-copy="bibtex"]');
    if (!button) return;

    const source = document.getElementById("bibtex");
    if (!source) return;

    try {
      await navigator.clipboard.writeText(source.textContent);
      const original = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = original || "Copy BibTeX";
      }, 1600);
    } catch {
      button.textContent = "Select text manually";
    }
  });

  // Homepage deformation-inspired background.
  const canvas = document.getElementById("field");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const hero = canvas.closest(".hero, .topic-hero") || canvas;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let width = 0;
  let height = 0;
  let deviceScale = Math.min(window.devicePixelRatio || 1, 2);
  let animationFrame = 0;
  let startTime = performance.now();
  let pointer = { x: -10000, y: -10000 };
  let pointerTarget = { x: -10000, y: -10000 };
  let isVisible = true;

  const spacing = 44;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    deviceScale = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * deviceScale);
    canvas.height = Math.round(height * deviceScale);
    context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  }

  function updatePointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointerTarget.x = event.clientX - rect.left;
    pointerTarget.y = event.clientY - rect.top;
  }

  function resetPointer() {
    pointerTarget.x = -10000;
    pointerTarget.y = -10000;
  }

  function drawStaticGrid() {
    context.clearRect(0, 0, width, height);
    context.lineWidth = 0.8;

    for (let y = -spacing; y < height + spacing; y += spacing) {
      context.beginPath();
      for (let x = -spacing; x < width + spacing; x += 8) {
        const offsetY = Math.sin(x * 0.018 + y * 0.012) * 5;
        if (x === -spacing) context.moveTo(x, y + offsetY);
        else context.lineTo(x, y + offsetY);
      }
      context.strokeStyle = "rgba(126, 224, 210, 0.13)";
      context.stroke();
    }

    for (let x = -spacing; x < width + spacing; x += spacing) {
      context.beginPath();
      for (let y = -spacing; y < height + spacing; y += 8) {
        const offsetX = Math.cos(y * 0.016 + x * 0.01) * 4;
        if (y === -spacing) context.moveTo(x + offsetX, y);
        else context.lineTo(x + offsetX, y);
      }
      context.strokeStyle = "rgba(102, 179, 255, 0.11)";
      context.stroke();
    }
  }

  function drawFrame(now) {
    if (!isVisible) {
      animationFrame = window.requestAnimationFrame(drawFrame);
      return;
    }

    // Smooth pointer motion so the mesh behaves like a deformable continuum.
    pointer.x += (pointerTarget.x - pointer.x) * 0.10;
    pointer.y += (pointerTarget.y - pointer.y) * 0.10;

    const time = now - startTime;
    context.clearRect(0, 0, width, height);
    context.lineWidth = 0.8;

    for (let y = -spacing; y < height + spacing; y += spacing) {
      context.beginPath();

      for (let x = -spacing; x < width + spacing; x += 8) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 260);
        const wave = Math.sin(x * 0.018 + time * 0.00055 + y * 0.012) * 5;
        const localDeformation =
          influence * 28 * Math.sin(distance * 0.035 - time * 0.002);
        const offsetY = wave + localDeformation;

        if (x === -spacing) context.moveTo(x, y + offsetY);
        else context.lineTo(x, y + offsetY);
      }

      context.strokeStyle = "rgba(126, 224, 210, 0.13)";
      context.stroke();
    }

    for (let x = -spacing; x < width + spacing; x += spacing) {
      context.beginPath();

      for (let y = -spacing; y < height + spacing; y += 8) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 260);
        const wave = Math.cos(y * 0.016 + time * 0.00045 + x * 0.01) * 4;
        const localDeformation =
          influence * 24 * Math.cos(distance * 0.03 - time * 0.0018);
        const offsetX = wave + localDeformation;

        if (y === -spacing) context.moveTo(x + offsetX, y);
        else context.lineTo(x + offsetX, y);
      }

      context.strokeStyle = "rgba(102, 179, 255, 0.11)";
      context.stroke();
    }

    animationFrame = window.requestAnimationFrame(drawFrame);
  }

  function startBackground() {
    window.cancelAnimationFrame(animationFrame);
    resizeCanvas();

    if (reducedMotion.matches) {
      drawStaticGrid();
      return;
    }

    startTime = performance.now();
    animationFrame = window.requestAnimationFrame(drawFrame);
  }

  hero.addEventListener("pointermove", updatePointer, { passive: true });
  hero.addEventListener("pointerleave", resetPointer, { passive: true });
  hero.addEventListener("pointercancel", resetPointer, { passive: true });

  window.addEventListener("resize", resizeCanvas, { passive: true });

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(hero);
  }

  if ("IntersectionObserver" in window) {
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(hero);
  }

  reducedMotion.addEventListener?.("change", startBackground);
  startBackground();
})();
