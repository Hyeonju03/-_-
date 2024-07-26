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

  // 입력받은 공지 끌어오는데 반대로 5개? 4개를 가져와야하니까 for문 반대로 쓰기

  const noticeItems = [];
  let count = 0;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    const noticeData = JSON.parse(localStorage.getItem(`NOTICE${i}`));
    if (!noticeData) {
      continue;
    }
    noticeItems.push({
      title: noticeData.title,
      content: noticeData.content,
      category: noticeData.category,
    });
    count++;
    if (count == 5) {
      console.log(noticeItems);
      break;
    }
  }

  const liList = document.getElementById("noticebox");

  noticeItems.forEach((item, index) => {
    const container = document.createElement("li");
    container.classList.add("notice_item_container");

    const p = document.createElement("p");
    const a = document.createElement("a");

    p.classList.add("text_lg");
    a.classList.add("notice_title");
    a.style.fontSize = "large";
    a.textContent = item.title;

    p.addEventListener("click", () => {
      window.location.href = "/notice/notice.html";
    });
    p.appendChild(a);
    container.appendChild(p);
    liList.appendChild(container);
  });

  ////////////////////////////////// 로그인 관련 ////////////////////////////////////

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();

  if (userData && userData.login) {
    if (userData.login == "1") {
      // 로그인 상태일 때
      loginLink.innerText = "로그아웃";
      loginLink.href = "#";
      loginLink.addEventListener("click", () => {
        // 로그아웃 처리
        userData.login = "0";
        saveUserData(userData);
        logoutUser(userData);

        // localStorage.setItem(`loginUser`, JSON.stringify(userData));
        location.reload(); // 페이지 새로고침
      });

      signupLink.innerText = "마이페이지";
      signupLink.href = "#";
    } else {
      // 로그아웃 상태일 때
      loginLink.innerText = "로그인";
      loginLink.href = "/login/2.로그인/로그인.html";

      signupLink.innerText = "회원가입";
      signupLink.href = "/login/1.회원가입/회원가입.html";
    }
  } else {
    loginLink.innerText = "로그인";
    loginLink.href = "/login/2.로그인/로그인.html";

    signupLink.innerText = "회원가입";
    signupLink.href = "/login/1.회원가입/회원가입.html";
  }
});

function getUserData() {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key == "loginUser") {
      const userData = JSON.parse(sessionStorage.getItem(key));
      if (userData) {
        return userData;
      }
    } else {
      continue;
    }
  }
  return null; // 사용자 데이터가 없거나 null인 경우
}

function saveUserData(userData) {
  sessionStorage.setItem(`loginUser`, JSON.stringify(userData));
}

// 로그아웃 클릭시 session에서 0으로 바뀐것을 local로 전달
function logoutUser(userData) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // localstorage 에 담긴 값.
    const localStorageData = localStorage.getItem(key);
    if (localStorageData) {
      try {
        // JSON문자열을 객체로 변환
        const localStorageObject = JSON.parse(localStorageData);
        // localStorage 객체와 session객체 비교.
        if (localStorageObject.id == userData.id) {
          // usreData의 login 값을 local에 업데이트
          localStorageObject.login = userData.login;

          // localStorageObject를 JSON문자열로 변환
          const updateLocalStorage = JSON.stringify(localStorageObject);

          localStorage.setItem(key, updateLocalStorage);
          break;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("if문 통과 못함");
    }
  }
}
