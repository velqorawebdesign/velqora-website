// Velqora — small progressive enhancements. The site works without this file.
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

  // ---------- Enquiry form ----------
  // Validates accessibly, then opens the visitor's own email app with the message.
  // Nothing is sent to or stored by this website.
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var summary = document.getElementById("error-summary");
  var summaryList = summary.querySelector("ul");
  var status = document.getElementById("form-status");
  var EMAIL_TO = "velqorawebdesign@gmail.com";

  var fields = [
    { id: "f-name", msg: "Enter your name" },
    {
      id: "f-email",
      msg: "Enter your email address",
      check: function (el) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) ? "" : "Enter an email address in the correct format, like name@example.com";
      }
    },
    { id: "f-message", msg: "Tell us a little about your project" },
    {
      id: "f-consent",
      msg: "Tick the box to confirm you've read how we use your details",
      check: function (el) { return el.checked ? "" : this.msg; }
    }
  ];

  function setError(el, message) {
    var err = document.getElementById(el.id + "-error");
    if (message) {
      el.setAttribute("aria-invalid", "true");
      err.textContent = message;
      err.hidden = false;
    } else {
      el.removeAttribute("aria-invalid");
      err.textContent = "";
      err.hidden = true;
    }
  }

  function validate(field) {
    var el = document.getElementById(field.id);
    var message = "";
    if (field.check) {
      message = el.type !== "checkbox" && !el.value.trim() ? field.msg : field.check(el);
    } else if (!el.value.trim()) {
      message = field.msg;
    }
    setError(el, message);
    return message;
  }

  // Re-check a field once the visitor leaves it, but only if it was already flagged
  fields.forEach(function (field) {
    var el = document.getElementById(field.id);
    var evt = el.type === "checkbox" ? "change" : "blur";
    el.addEventListener(evt, function () {
      if (el.getAttribute("aria-invalid") === "true") validate(field);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";

    var errors = [];
    fields.forEach(function (field) {
      var message = validate(field);
      if (message) errors.push({ id: field.id, message: message });
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

    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var project = form.elements.project.value;
    var message = form.elements.message.value.trim();

    var subject = "Website enquiry from " + name;
    var body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      (project ? "Project: " + project + "\n" : "") +
      "\n" + message + "\n";

    window.location.href =
      "mailto:" + EMAIL_TO +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    status.textContent =
      "Your email app should now open with your message ready to send. If nothing happens, email us at " +
      EMAIL_TO + " or message us on WhatsApp.";
  });
})();
