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
      signupLink.href = "/mypage/회원정보수정및조회/회원정보메인.html";
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

// ////////////////////////////////////////////////시험기간. 빠른거
// 오늘 날짜와 접수 날짜 비교,
// 비교한 숫자가 가장 작은순서대로  배열에 추가
// 배열에는 최대 5개만 담을것.
const examData = JSON.parse(localStorage.getItem("examData"));
let today = new Date();
let min = 1000;

// 날짜 차이를 계산
function getDateDifference(date1, date2) {
  return Math.floor(
    Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24))
  );
}

// 가장 가까운 날짜를 찾는 함수입니다.
function getClosestDates(examData, today) {
  const dateDifferences = [];

  // `examData`의 각 접수 날짜와 `today` 사이의 차이를 계산하여 배열에 추가합니다.
  for (const key in examData) {
    if (examData.hasOwnProperty(key)) {
      const receipt = new Date(examData[key].접수);
      // 오늘 날짜가 접수 날짜를 지나지 않은 경우에만 처리합니다.
      if (today <= receipt) {
        const diffDate = getDateDifference(today, receipt);
        dateDifferences.push({ key, diffDate, receipt });
      }
    }
  }

  // 날짜 차이를 기준으로 오름차순 정렬합니다.
  dateDifferences.sort((a, b) => a.diffDate - b.diffDate);

  // 최대 5개의 요소만 남기고 잘라냅니다.
  const closestDates = dateDifferences.slice(0, 5);

  // 결과를 반환합니다.
  return closestDates.map((item) => ({
    key: item.key,
    diffDate: item.diffDate,
    receipt: item.receipt,
  }));
}

// 결과를 가져옵니다.
const closestDates = getClosestDates(examData, today);

// 결과를 콘솔에 출력합니다.
console.log(closestDates);

const ulList = document.getElementById("receiptList");
closestDates.forEach((item, index) => {
  const container = document.createElement("li");
  container.classList.add("li0");

  const pTitle = document.createElement("p");
  pTitle.classList.add("text_lg");

  const pSub = document.createElement("p");
  const spanOnline = document.createElement("span");
  const spanTime = document.createElement("span");
  const spanExam = document.createElement("span");
  const spanExTime = document.createElement("span");
  spanOnline.innerText = "온라인";
  spanExam.innerText = "시험일";

  for (let k in examData) {
    if (item.key == k) {
      pTitle.innerText = examData[k].과목;
      spanTime.innerText = examData[k].접수;
      spanExTime.innerText = examData[k].시험일;
    }
  }
  pTitle.style.fontSize = "15px";
  spanExam.style.fontWeight = "bold";
  spanExTime.style.fontWeight = "bold";

  pSub.appendChild(spanOnline);
  pSub.appendChild(spanTime);
  pSub.appendChild(spanExam);
  pSub.appendChild(spanExTime);

  container.appendChild(pTitle);
  container.appendChild(pSub);

  container.addEventListener("click", () => {
    window.location.href = "/examSchedule/examSchedule.html";
  });

  ulList.appendChild(container);
});
