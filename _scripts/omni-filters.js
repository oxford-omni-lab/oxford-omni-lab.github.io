/*
  Filter buttons on the News and Publications pages ([data-filter-group]):
  mark the button matching the current search as active, and open folded
  sections (such as "Show earlier news") while a filter or search is active.
  The filtering itself is done by search.js.
*/
{
  const onLoad = () => {
    const query =
      new URLSearchParams(window.location.search).get("search") || "";
    document.querySelectorAll("[data-filter-group] a").forEach((a) => {
      if (a.dataset.query === query) a.setAttribute("aria-current", "true");
    });
    if (query)
      document
        .querySelectorAll("details.omni-earlier")
        .forEach((d) => (d.open = true));
  };
  window.addEventListener("DOMContentLoaded", onLoad);
}
