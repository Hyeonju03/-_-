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

let logintext = document.getElementById("login");
let mypagetext = document.getElementById("mypage");

for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(i)).login == "1") {
    logintext.innerText = "로그아웃";
    mypagetext.innerText = "마이페이지";

    //로그아웃 클릭시
    logintext.addEventListener("click", () => {
      // 글씨 바꾸기
      logintext.innerText = "로그인";
      mypagetext.innerText = "회원가입";
      const item = JSON.parse(localStorage.getItem(i));
      item.login = "0";
      localStorage.setItem(i, JSON.stringify(item));
      // console.log(JSON.parse(localStorage.getItem(i)).login);
      // 이거 1나옴 왜지?

      //한번 더 누르면
      logintext.addEventListener("click", () => {
        //로그아웃탭으로 이동
        logintext.href = "/login/2.로그인/로그인.html";
      });
    });

    //마이페이지 이동
    mypagetext.addEventListener("click", () => {
      mypagetext.href = "#";
    });
  }
}
