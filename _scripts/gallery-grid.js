/*
  Gallery lightbox functionality
*/

{
  let currentLightboxIndex = 0;
  let galleryImages = [];

  const initGallery = () => {
    // Get gallery images from the global variable set by Jekyll
    if (window.galleryImages && window.galleryImages.length > 0) {
      galleryImages = window.galleryImages;
    }
  };

  const openLightbox = (index) => {
    if (!galleryImages.length) return;

    currentLightboxIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const currentSpan = document.getElementById("lightbox-current");
    const totalSpan = document.getElementById("lightbox-total");

    if (lightbox && lightboxImage && currentSpan && totalSpan) {
      lightboxImage.src = galleryImages[index].src;
      lightboxImage.alt = galleryImages[index].alt;
      if (lightboxTitle && galleryImages[index].title) {
        lightboxTitle.textContent = galleryImages[index].title;
      }
      currentSpan.textContent = index + 1;
      totalSpan.textContent = galleryImages.length;

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  };

  const closeLightbox = () => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    }
  };

  const changeLightboxImage = (direction) => {
    if (!galleryImages.length) return;

    currentLightboxIndex += direction;

    if (currentLightboxIndex >= galleryImages.length) {
      currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
      currentLightboxIndex = galleryImages.length - 1;
    }

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const currentSpan = document.getElementById("lightbox-current");

    if (lightboxImage && currentSpan) {
      lightboxImage.src = galleryImages[currentLightboxIndex].src;
      lightboxImage.alt = galleryImages[currentLightboxIndex].alt;
      if (lightboxTitle && galleryImages[currentLightboxIndex].title) {
        lightboxTitle.textContent = galleryImages[currentLightboxIndex].title;
      }
      currentSpan.textContent = currentLightboxIndex + 1;
    }
  };

  // Keyboard navigation
  const handleKeydown = (event) => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.classList.contains("active")) {
      switch (event.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          changeLightboxImage(-1);
          break;
        case "ArrowRight":
          changeLightboxImage(1);
          break;
      }
    }
  };

  // Make functions globally available
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.changeLightboxImage = changeLightboxImage;

  // Initialize when page loads
  const onLoad = () => {
    initGallery();
    document.addEventListener("keydown", handleKeydown);
  };

  // Start when page loads
  window.addEventListener("load", onLoad);
}
