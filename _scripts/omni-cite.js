/*
  "Cite" buttons on the Publications page: copy a plain-text citation
  (stored in data-cite) to the clipboard.
*/
{
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-cite]");
    if (!button) return;
    const text = button.dataset.cite;
    try {
      await navigator.clipboard.writeText(text);
      const label = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => (button.textContent = label), 1500);
    } catch (error) {
      window.prompt("Copy this citation:", text);
    }
  });
}
