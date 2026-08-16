(function () {
  var storageKey = "sevaux-theme";
  var root = document.documentElement;
  var savedTheme;

  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }

  var theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  root.setAttribute("data-theme", theme);

  function updateToggle(toggle) {
    var currentTheme = root.getAttribute("data-theme");
    var nextTheme = currentTheme === "dark" ? "light" : "dark";
    var label = nextTheme === "light" ? "Light mode" : "Dark mode";
    var description = "Switch to " + nextTheme + " mode";

    toggle.setAttribute("aria-label", description);
    toggle.setAttribute("title", description);
    toggle.querySelector("[data-theme-label]").textContent = label;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (toggle) {
      updateToggle(toggle);

      toggle.addEventListener("click", function () {
        var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", nextTheme);

        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch (error) {
          // The selected theme still applies when browser storage is unavailable.
        }

        updateToggle(toggle);
      });
    });
  });
})();
