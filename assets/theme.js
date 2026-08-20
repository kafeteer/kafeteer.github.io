/*
 * Theme toggle for kafeteer.github.io
 *
 * The site follows the OS colour scheme by default. Once the visitor presses
 * the toggle, an explicit choice is stored in localStorage and pinned onto
 * <html data-theme="light|dark">, which the CSS overrides key off.
 *
 * Load this synchronously at the end of <head> so the attribute is set before
 * first paint (no flash of the wrong theme).
 */
(function () {
  "use strict";

  var STORAGE_KEY = "kafeteer-theme";
  var THEME_COLOR = { light: "#FFFEFA", dark: "#141415" };
  var root = document.documentElement;

  // Remember the media queries on the static <meta name="theme-color"> tags so
  // they can be parked and restored as the visitor's preference changes.
  var mediaMetas = [];
  var nodes = document.querySelectorAll('meta[name="theme-color"][media]');
  for (var i = 0; i < nodes.length; i++) {
    mediaMetas.push({ el: nodes[i], media: nodes[i].getAttribute("media") });
  }

  function read() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function write(theme) {
    try {
      if (theme) localStorage.setItem(STORAGE_KEY, theme);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* private browsing / storage disabled — the toggle still works per page */
    }
  }

  function systemTheme() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function activeTheme() {
    return root.getAttribute("data-theme") || systemTheme();
  }

  function syncThemeColor() {
    var explicit = root.getAttribute("data-theme");

    for (var i = 0; i < mediaMetas.length; i++) {
      mediaMetas[i].el.setAttribute(
        "media",
        explicit ? "not all" : mediaMetas[i].media
      );
    }

    var override = document.querySelector(
      'meta[name="theme-color"][data-theme-override]'
    );

    if (!explicit) {
      if (override) override.parentNode.removeChild(override);
      return;
    }

    if (!override) {
      override = document.createElement("meta");
      override.setAttribute("name", "theme-color");
      override.setAttribute("data-theme-override", "");
      document.head.appendChild(override);
    }
    override.setAttribute("content", THEME_COLOR[explicit]);
  }

  function syncButton() {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;
    var next = activeTheme() === "dark" ? "light" : "dark";
    var label = "Switch to " + next + " mode";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
    button.setAttribute("aria-pressed", activeTheme() === "dark" ? "true" : "false");
  }

  function applyTheme(theme) {
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    syncThemeColor();
    syncButton();
  }

  // Runs before paint: pin the stored preference, if any.
  applyTheme(read());

  function ready() {
    var button = document.querySelector(".theme-toggle");
    if (button) {
      button.addEventListener("click", function () {
        var next = activeTheme() === "dark" ? "light" : "dark";
        write(next);
        applyTheme(next);
      });
    }
    syncButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  // While no explicit choice is stored, keep following the OS.
  if (window.matchMedia) {
    var query = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () {
      if (!read()) applyTheme(null);
    };
    if (query.addEventListener) query.addEventListener("change", onChange);
    else if (query.addListener) query.addListener(onChange);
  }
})();
