document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("[data-index-hero]");

  if (!hero) return;

  const lines = [...hero.querySelectorAll(".index-hero-line")];
  const startDelay = 250;
  const lineDelay = 700;
  const wait = (delay) =>
    new Promise((resolve) => window.setTimeout(resolve, delay));

  const typeLine = (line, keepCursor = false) =>
    new Promise((resolve) => {
      const target = line.querySelector(".index-hero-type");
      const text = target?.dataset.text || "";
      const speed = Number(line.dataset.typeSpeed) || 50;
      const characters = [...text];
      let index = 0;

      if (!target) {
        resolve();
        return;
      }

      target.textContent = "";
      line.classList.add("is-active");

      const typeNext = () => {
        if (index < characters.length) {
          target.textContent += characters[index];
          index += 1;
          window.setTimeout(typeNext, speed);
          return;
        }

        if (!keepCursor) line.classList.remove("is-active");
        resolve();
      };

      typeNext();
    });

  lines.forEach((line) => {
    const target = line.querySelector(".index-hero-type");
    if (target) target.textContent = "";
  });

  window.setTimeout(async () => {
    for (let index = 0; index < lines.length; index += 1) {
      if (index > 0) await wait(lineDelay);
      await typeLine(lines[index], index === lines.length - 1);
    }
  }, startDelay);
});
