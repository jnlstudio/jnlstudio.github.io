/* JNL Studio | Two Worlds — phone split view.
   One state: which world is open ("none", "jewellery" or "creations").
   Phones (767px and below) only; wider screens keep the static two-column layout. */
(function () {
  "use strict";

  var worlds = document.querySelector(".worlds");
  if (!worlds || !window.matchMedia) return;

  var phone = window.matchMedia("(max-width: 767px)");
  var NAMES = { jewellery: "Jewellery", creations: "Creations" };
  var KEYS = ["jewellery", "creations"];
  var parts = {};
  var active = "none";

  KEYS.forEach(function (key) {
    var panel = document.getElementById(key + "-panel");
    parts[key] = {
      panel: panel,
      toggle: worlds.querySelector('.world__toggle[data-world="' + key + '"]'),
      close: panel && panel.querySelector(".world__close"),
      title: panel && panel.querySelector(".world__title")
    };
  });
  if (KEYS.some(function (k) { return !parts[k].panel || !parts[k].toggle; })) return;

  function render(focusEl) {
    var onPhone = phone.matches;
    var state = onPhone ? active : "none";
    worlds.setAttribute("data-active", state);

    KEYS.forEach(function (key) {
      var p = parts[key];
      var open = state === key;
      p.toggle.setAttribute("aria-expanded", open ? "true" : "false");
      p.toggle.setAttribute("aria-label", (state === "none" ? "Open " : "Switch to ") + NAMES[key]);
      // A closed menu on a phone cannot be reached by keyboard or screen reader.
      if (onPhone && !open) p.panel.setAttribute("inert", "");
      else p.panel.removeAttribute("inert");
    });

    if (focusEl) focusEl.focus({ preventScroll: true });
  }

  function open(key) {
    if (active === key) return;
    active = key;
    render(parts[key].title);
  }

  function close() {
    if (active === "none") return;
    var was = active;
    active = "none";
    render(parts[was].toggle);
  }

  KEYS.forEach(function (key) {
    parts[key].toggle.addEventListener("click", function () { open(key); });
    if (parts[key].close) parts[key].close.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if ((e.key === "Escape" || e.key === "Esc") && phone.matches) close();
  });

  // Rotating to a wide screen (or back) always starts from the plain two-world view.
  var onChange = function () { active = "none"; render(); };
  if (phone.addEventListener) phone.addEventListener("change", onChange);
  else if (phone.addListener) phone.addListener(onChange);

  render();
})();

/* Mouse parallax on the two background pictures — desktops with a fine pointer only.
   Writes two custom properties per world (--px, --py) that feed the picture's own
   `translate` layer, so it adds to the CSS drift (`transform`) instead of replacing it.
   Text, logo, buttons and lines are never touched. Touch screens and reduced motion: off. */
(function () {
  "use strict";

  var hero = document.querySelector(".worlds");
  if (!hero || !window.matchMedia || !window.requestAnimationFrame) return;

  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  var MAX = 10;       // px, largest offset
  var EASE = 0.06;    // share of the remaining distance covered each frame

  // Each world gets its own direction and weight, so the two pictures part slightly.
  var layers = [
    { el: hero.querySelector(".world--jewellery"), kx: -1.0, ky: -0.7 },
    { el: hero.querySelector(".world--creations"), kx: -0.75, ky: 1.0 }
  ].filter(function (l) { return l.el; });
  if (!layers.length) return;

  var target = { x: 0, y: 0 };
  var now = { x: 0, y: 0 };
  var frame = 0;

  function paint() {
    now.x += (target.x - now.x) * EASE;
    now.y += (target.y - now.y) * EASE;
    var settled = Math.abs(target.x - now.x) < 0.01 && Math.abs(target.y - now.y) < 0.01;
    if (settled) { now.x = target.x; now.y = target.y; }
    layers.forEach(function (l) {
      l.el.style.setProperty("--px", (now.x * l.kx * MAX).toFixed(2) + "px");
      l.el.style.setProperty("--py", (now.y * l.ky * MAX).toFixed(2) + "px");
    });
    frame = settled ? 0 : requestAnimationFrame(paint);
  }
  function wake() { if (!frame) frame = requestAnimationFrame(paint); }

  function onMove(e) {
    if (e.pointerType === "touch") return; // touch-screen laptops: fingers never drive the parallax
    var r = hero.getBoundingClientRect();
    // -1 … 1 across the hero, 0 at its centre
    target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    wake();
  }
  function onLeave() { target.x = 0; target.y = 0; wake(); }

  var on = false;
  function update() {
    var want = fine.matches && !calm.matches;
    if (want === on) return;
    on = want;
    if (on) {
      hero.addEventListener("pointermove", onMove, { passive: true });
      hero.addEventListener("pointerleave", onLeave, { passive: true });
    } else {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      frame = 0; target.x = target.y = now.x = now.y = 0;
      layers.forEach(function (l) { l.el.style.removeProperty("--px"); l.el.style.removeProperty("--py"); });
    }
  }
  [fine, calm].forEach(function (mq) {
    if (mq.addEventListener) mq.addEventListener("change", update);
    else if (mq.addListener) mq.addListener(update);
  });
  update();
})();
