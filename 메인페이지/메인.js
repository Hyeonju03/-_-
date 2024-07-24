document.addEventListener("DOMContentLoaded", function () {
  const slide = document.querySelector(".slide");
  let slideWidth = slide.clientWidth;

  let slideItems = document.querySelectorAll(".slide_item");
  const maxSlide = slideItems.length;
  let currSlide = 1;

  const startSlide = slideItems[0];
  const endSlide = slideItems[slideItems.length - 1];
  const startElem = document.createElement("div");
  const endElem = document.createElement("div");

  endSlide.classList.forEach((c) => endElem.classList.add(c));
  endElem.innerHTML = endSlide.innerHTML;

  startSlide.classList.forEach((c) => startElem.classList.add(c));
  startElem.innerHTML = startSlide.innerHTML;

  slideItems[0].before(endElem);
  slideItems[slideItems.length - 1].after(startElem);

  slideItems = document.querySelectorAll(".slide_item");

  let offset = slideWidth + currSlide;
  slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);
  });

  function nextMove() {
    currSlide++;
    if (currSlide <= maxSlide) {
      const offset = slideWidth * currSlide;
      slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
      });
    } else {
      currSlide = 0;
      let offset = slideWidth * currSlide;
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0}s; left:${-offset}px`);
      });
      currSlide++;
      offset = slideWidth * currSlide;
      setTimeout(() => {
        slideItems.forEach((i) => {
          i.setAttribute("style", `transition: ${0.15}s left: ${-offset}px`);
        });
      }, 0);
    }
  }

  window.addEventListener("resize", () => {
    slideWidth = slide.clientWidth;
  });

  let loopInterval = setInterval(() => {
    nextMove();
  }, 3000);

  slide.addEventListener("mouseover", () => {
    clearInterval(loopInterval);
  });

  slide.addEventListener("mouseout", () => {
    loopInterval = setInterval(() => {
      nextMove();
    }, 3000);
  });
});
