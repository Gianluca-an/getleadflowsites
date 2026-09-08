/* GetLeadFlow — shared site JS */
(function () {
  "use strict";
  var nav = document.querySelector("header.nav");
  var toggle = document.querySelector(".nav-toggle");

  if (nav) {
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  /* FAQ accordion (single-open) */
  document.querySelectorAll(".qa").forEach(function (item) {
    var q = item.querySelector(".q"), a = item.querySelector(".a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("open");
      var parent = item.parentElement;
      if (parent) parent.querySelectorAll(".qa.open").forEach(function (o) {
        o.classList.remove("open");
        var oa = o.querySelector(".a"); if (oa) oa.style.maxHeight = null;
      });
      if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* contact form — mailto fallback (works with zero backend), or set
     data-endpoint to a Formspree URL to collect submissions automatically. */
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
      if (data.get("company_website")) { e.preventDefault(); return; } // honeypot
      if (!endpoint) {
        e.preventDefault();
        var subject = encodeURIComponent("New lead from GetLeadFlow — " + (data.get("name") || ""));
        var body = encodeURIComponent(
          "Name: " + (data.get("name") || "") + "\n" +
          "Business: " + (data.get("business") || "") + "\n" +
          "Email: " + (data.get("email") || "") + "\n" +
          "Phone: " + (data.get("phone") || "") + "\n" +
          "City: " + (data.get("location") || "") + "\n" +
          "Monthly ceramic/PPF jobs now: " + (data.get("volume") || "") + "\n\n" +
          "Message:\n" + (data.get("message") || "")
        );
        window.location.href = "mailto:contact@getleadflowsites.com?subject=" + subject + "&body=" + body;
        setStatus("Opening your email app… if nothing happens, email contact@getleadflowsites.com", true);
        return;
      }
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) { form.reset(); setStatus("Thanks! We got your request and will reach out within 24 hours.", true); }
          else setStatus("Something went wrong. Please email contact@getleadflowsites.com", false);
        })
        .catch(function () { setStatus("Network error. Please email contact@getleadflowsites.com", false); })
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = original; } });
    });
  }
})();
