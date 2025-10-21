// Email obfuscation script
// Decodes obfuscated email addresses and makes them clickable
// This protects email addresses from scrapers while keeping them user-friendly

document.addEventListener("DOMContentLoaded", function () {
  // Find all obfuscated email links
  document
    .querySelectorAll("a.email-link[data-email][data-domain]")
    .forEach(function (link) {
      const emailUser = link.dataset.email;
      const emailDomain = link.dataset.domain;
      const email = emailUser + "@" + emailDomain;

      // Set the mailto link
      link.href = "mailto:" + email;

      // Check if there's an icon
      const icon = link.querySelector("i");
      const textSpan = link.querySelector("span");

      // If there's text content (not just icon), keep it as is
      // If there's only an icon (no text span or empty span), keep just the icon
      if (textSpan && textSpan.textContent.trim() === "") {
        // Icon-only button (like in footer) - keep just the icon, don't add email
        if (icon) {
          link.innerHTML = icon.outerHTML;
        }
      } else if (!textSpan && icon && link.textContent.trim() === "") {
        // Icon-only link without span wrapper - keep just the icon
        link.innerHTML = icon.outerHTML;
      }
      // Otherwise, keep the existing text content (button with text)

      // Remove data attributes to clean up DOM
      delete link.dataset.email;
      delete link.dataset.domain;
    });
});
