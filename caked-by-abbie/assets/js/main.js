// Caked by Abbie — small progressive enhancements.
// No analytics, no cookies, no storage, no network requests.
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // ---------- Mobile navigation ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var label = toggle.querySelector(".nav-toggle-label");

    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // ---------- Reveal on scroll ----------
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // ---------- Order planner ----------
  // Validates accessibly, then writes an order message the visitor copies into Instagram.
  // Nothing is sent to or stored by this website.
  var form = document.getElementById("order-form");
  if (!form) return;

  var summary = document.getElementById("error-summary");
  var summaryList = summary.querySelector("ul");
  var result = document.getElementById("result");
  var resultTitle = document.getElementById("result-title");
  var output = document.getElementById("f-result");
  var copyBtn = document.getElementById("copy-btn");
  var status = document.getElementById("form-status");

  // Earliest selectable date is today
  var dateInput = document.getElementById("f-date");
  var now = new Date();
  var today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = today;

  var fields = [
    { id: "f-name", msg: "Enter your name" },
    { id: "f-item", msg: "Choose what you'd like to order" },
    {
      id: "f-qty",
      optional: true,
      check: function (el) {
        var v = el.value.trim();
        return v === "" || (/^\d+$/.test(v) && +v >= 1 && +v <= 20) ? "" : "Enter a quantity from 1 to 20";
      }
    },
    {
      id: "f-date",
      msg: "Enter the date you need your order",
      check: function (el) { return el.value >= today ? "" : "Choose a date from today onwards"; }
    },
    {
      id: "f-method",
      group: "method",
      focusId: "f-collect",
      check: function () { return form.querySelector('input[name="method"]:checked') ? "" : "Choose collection or delivery"; }
    },
    {
      id: "f-consent",
      check: function (el) { return el.checked ? "" : "Tick the box to confirm you've read how your details are used"; }
    }
  ];

  function setError(field, message) {
    var err = document.getElementById(field.id + "-error");
    var targets = field.group ? form.querySelectorAll('input[name="' + field.group + '"]') : [document.getElementById(field.id)];
    targets.forEach(function (el) {
      if (message) el.setAttribute("aria-invalid", "true");
      else el.removeAttribute("aria-invalid");
    });
    err.textContent = message;
    err.hidden = !message;
  }

  function validate(field) {
    var message = "";
    if (!field.group) {
      var el = document.getElementById(field.id);
      var empty = el.type === "checkbox" ? false : !el.value.trim();
      if (empty && !field.optional) message = field.msg;
      else if (field.check) message = field.check(el);
    } else {
      message = field.check();
    }
    setError(field, message);
    return message;
  }

  // Re-check a field when the visitor changes it, but only if it was already flagged
  fields.forEach(function (field) {
    var els = field.group ? form.querySelectorAll('input[name="' + field.group + '"]') : [document.getElementById(field.id)];
    els.forEach(function (el) {
      // Clear errors as soon as they're fixed, so nothing moves while the visitor clicks elsewhere
      var evt = el.type === "checkbox" || el.type === "radio" || el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(evt, function () {
        var flagged = document.getElementById(field.id + "-error").hidden === false;
        if (flagged) validate(field);
      });
    });
  });

  function value(name) {
    var el = form.elements[name];
    return el ? String(el.value).trim() : "";
  }

  function formatDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var errors = [];
    fields.forEach(function (field) {
      var message = validate(field);
      if (message) errors.push({ id: field.focusId || field.id, message: message });
    });

    summaryList.innerHTML = "";
    if (errors.length) {
      errors.forEach(function (err) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + err.id;
        a.textContent = err.message;
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          document.getElementById(err.id).focus();
        });
        li.appendChild(a);
        summaryList.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;

    var method = form.querySelector('input[name="method"]:checked').value;
    var lines = [
      "Hi Abbie! I'd like to order:",
      "",
      "Name: " + value("name"),
      "Order: " + value("product") + (value("quantity") && value("quantity") !== "1" ? " x " + value("quantity") : ""),
      "Date needed: " + formatDate(value("date")),
      "Collection or delivery: " + method
    ];
    if (value("sponge")) lines.push("Sponge: " + value("sponge"));
    if (value("buttercream")) lines.push("Buttercream: " + value("buttercream"));
    if (value("filling")) lines.push("Filling: " + value("filling"));
    if (value("colours")) lines.push("Colours / theme: " + value("colours"));
    if (form.elements.vintage.checked) lines.push("Vintage piping style: yes please (+ €5)");
    if (value("extras")) lines.push("", "Other details: " + value("extras"));
    lines.push("", "I'll send any inspiration photos here too. Thank you!");

    output.value = lines.join("\n");
    status.textContent = "";
    result.hidden = false;
    resultTitle.focus();
  });

  copyBtn.addEventListener("click", function () {
    var done = function () {
      status.textContent = "Copied. Now open the Instagram chat and paste your message.";
    };
    var fallback = function () {
      output.focus();
      output.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
      status.textContent = ok ? "Copied. Now open the Instagram chat and paste your message." : "Couldn't copy automatically. The message is selected, so copy it with your device's copy option.";
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(output.value).then(done, fallback);
    } else {
      fallback();
    }
  });
})();
