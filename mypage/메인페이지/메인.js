document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let slider = document.querySelector(".slider");
  const sliders = document.querySelectorAll(".selider li");

  let currentSlide = 0;
  let slideWidth = sliders[0].clientWidth;

  function foToSlide(index) {
    if (index < 0) {
      index = sliders.length - 1;
    } else if (index >= sliders.length) {
      index = 0;
    }
    slider.computedStyleMap.transform = `translateX(${-index * slideWidth}px)`;

    currentSlide = index;
  }

  const interval = setInterval(function () {
    foToSlide(currentSlide + 1);
  }, 4000);

  slider.addEventListener("mouseenter", function () {
    clearInterval(interval);
  });

  slider.addEventListener(
    "mouseleave",
    function () {
      goToSlide(currentSlide + 1);
    },
    4000
  );
});
