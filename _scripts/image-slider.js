/*
  Image slider with automatic advancement and manual controls
*/

{
  let currentSlideIndex = 0;
  let autoSlideTimer;
  let slides, dots, totalSlides;

  const initSlider = () => {
    slides = document.querySelectorAll(".slider-image");
    dots = document.querySelectorAll(".dot");
    totalSlides = slides.length;

    if (totalSlides === 0) return;

    startAutoSlide();

    // Add event listeners
    const slider = document.querySelector(".image-slider");
    if (slider) {
      slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlideTimer);
      });

      slider.addEventListener("mouseleave", () => {
        startAutoSlide();
      });
    }
  };

  const showSlide = (index) => {
    if (!slides || !dots) return;

    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    if (slides[index]) slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
  };

  const changeSlide = (direction) => {
    currentSlideIndex += direction;

    if (currentSlideIndex >= totalSlides) {
      currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
      currentSlideIndex = totalSlides - 1;
    }

    showSlide(currentSlideIndex);
    resetAutoSlide();
  };

  const currentSlide = (index) => {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetAutoSlide();
  };

  const nextSlide = () => {
    changeSlide(1);
  };

  const startAutoSlide = () => {
    if (totalSlides > 1) {
      // Get slider interval from CSS variable
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue("--slider-interval")
        .trim();

      let sliderInterval = 5000; // fallback to 5 seconds

      if (cssValue) {
        if (cssValue.endsWith("s")) {
          // Convert seconds to milliseconds
          sliderInterval = parseFloat(cssValue) * 1000;
        } else {
          // Assume milliseconds
          sliderInterval = parseInt(cssValue);
        }
      }

      autoSlideTimer = setInterval(nextSlide, sliderInterval);
    }
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  };

  // Make functions globally available
  window.changeSlide = changeSlide;
  window.currentSlide = currentSlide;

  // Initialize when page loads
  const onLoad = () => {
    initSlider();
  };

  // Start when page loads
  window.addEventListener("load", onLoad);
}
