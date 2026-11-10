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
