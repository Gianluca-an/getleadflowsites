/* ============================================================
   GetLeadFlow Sites — main.js
   Nav toggle · sticky header · FAQ accordion · scroll reveal · form
   ============================================================ */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is tapped
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Sticky header shadow on scroll ---- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // close siblings for a clean single-open accordion
      var parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll(".faq-item.open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("open");
            var oa = other.querySelector(".faq-a");
            if (oa) oa.style.maxHeight = null;
            var oq = other.querySelector(".faq-q");
            if (oq) oq.setAttribute("aria-expanded", "false");
          }
        });
      }
      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", !isOpen ? "true" : "false");
      a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
    });
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact form ----
     By default this uses a mailto fallback so the site works with zero backend.
     To collect submissions automatically, create a free Formspree form
     (https://formspree.io), then set data-endpoint on the <form> to your
     Formspree URL (e.g. https://formspree.io/f/xxxxxxx). When an endpoint is
     present the form submits via fetch and shows an inline success message. */
  var form = document.getElementById("lead-form");
  if (form) {
    var statusEl = form.querySelector(".form-status");

    function setStatus(msg, ok) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = "form-status show " + (ok ? "ok" : "err");
    }

    form.addEventListener("submit", function (e) {
      var endpoint = form.getAttribute("data-endpoint");
      var data = new FormData(form);

      // Honeypot spam check
      if (data.get("company_website")) { e.preventDefault(); return; }

      if (!endpoint) {
        // mailto fallback — let the browser build the email
        e.preventDefault();
        var subject = encodeURIComponent("New lead from GetLeadFlow site — " + (data.get("name") || ""));
        var body = encodeURIComponent(
          "Name: " + (data.get("name") || "") + "\n" +
          "Business: " + (data.get("business") || "") + "\n" +
          "Email: " + (data.get("email") || "") + "\n" +
          "Phone: " + (data.get("phone") || "") + "\n" +
          "Location: " + (data.get("location") || "") + "\n" +
          "Monthly ceramic/PPF jobs now: " + (data.get("volume") || "") + "\n\n" +
          "Message:\n" + (data.get("message") || "")
        );
        window.location.href = "mailto:contact@getleadflowsites.com?subject=" + subject + "&body=" + body;
        setStatus("Opening your email app… if nothing happens, email us at contact@getleadflowsites.com", true);
        return;
      }

      // fetch submit to endpoint (e.g. Formspree)
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("Thanks! We got your request and will reach out within 24 hours to book your call.", true);
          } else {
            setStatus("Something went wrong. Please email us directly at contact@getleadflowsites.com", false);
          }
        })
        .catch(function () {
          setStatus("Network error. Please email us directly at contact@getleadflowsites.com", false);
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  }
})();
