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

      // If the link text is a placeholder, replace it with the actual email
      if (
        link.textContent.trim() === "Contact" ||
        link.textContent.includes("@") === false
      ) {
        // Check if there's an icon
        const icon = link.querySelector("i");
        if (icon) {
          // Preserve the icon and add email after it
          link.innerHTML = icon.outerHTML + " " + email;
        } else if (link.dataset.showEmail !== "false") {
          // Only show email if not explicitly hidden
          link.textContent = email;
        }
      }

      // Remove data attributes to clean up DOM
      delete link.dataset.email;
      delete link.dataset.domain;
    });
});
