/*
  OMNI Lab videos: only download a video when it comes near the screen,
  play it muted while visible, and pause it when scrolled away.
  Visitors with "reduce motion" switched on see the still image instead
  (videos with controls can still be played by pressing play).
  Applies to <video data-autoplay data-src="..."> (see _includes/omni-video.html).
*/

{
  const onLoad = () => {
    const videos = document.querySelectorAll("video[data-autoplay]");
    if (!videos.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const load = (video) => {
      if (!video.getAttribute("src") && video.dataset.src)
        video.src = video.dataset.src;
    };

    const play = (video) => {
      video.muted = true;
      const promise = video.play();
      if (promise && promise.catch) promise.catch(() => {});
    };

    // reduced motion: attach sources (nothing downloads until play is pressed)
    if (reduceMotion) {
      videos.forEach(load);
      return;
    }

    // very old browsers: just load and play
    if (!("IntersectionObserver" in window)) {
      videos.forEach((video) => {
        load(video);
        play(video);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            load(video);
            play(video);
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    videos.forEach((video) => observer.observe(video));
  };

  window.addEventListener("load", onLoad);
}
