document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // notice로 시작하면서 noticeno가 아닌애들 뽑아내기
  const noticeItems = [];
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.startsWith("NOTICE") && key != "NOTICEno") {
      const noticeData = JSON.parse(localStorage.getItem(key));
      noticeItems.push({
        title: noticeData.title,
        content: noticeData.content,
        category: noticeData.category,
      });
    }
  }

  //
  const dlList = document.getElementById("noticeList");
  noticeItems.forEach((item, index) => {
    let userData = getUserData();
    const container = document.createElement("div");
    container.classList.add("notice_item_container");

    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    const deleteBtn = document.createElement("button");

    dt.classList.add("notice_title");
    dd.classList.add("notice_view");
    deleteBtn.classList.add("commentBtn");

    dt.textContent = item.title;
    dd.textContent = item.content;
    deleteBtn.textContent = "삭제하기";

    dt.id = `dt${index}`;
    dd.style.display = "none";
    deleteBtn.style.display = "none";

    // dt 클릭시
    dt.addEventListener("click", () => {
      // dd가 none
      if (dd.style.display == "none") {
        dd.style.display = "block";
        if (userData && userData.login == 1) {
          if (userData.id == "admin") {
            deleteBtn.style.display = "block";
          } else {
            deleteBtn.style.display = "none";
          }
        }
      } else {
        dd.style.display = "none";
        deleteBtn.style.display = "none";
      }
    });

    deleteBtn.addEventListener("click", () => {
      for (let i = 0; i < localStorage.length; i++) {
        const local = JSON.parse(localStorage.getItem(`NOTICE${i}`));

        if (local) {
          if (local.title == dt.innerText) {
            window.localStorage.removeItem(`NOTICE${i}`);
            container.remove();
            alert("삭제되었습니다.");
          }
        }
      }
    });

    // 조건 등록시 걸러지기
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {
      const select = document.querySelector("option[name=filter]:checked");
      const searchText = document.getElementById("searchText");
      if (select.value == "submit") {
        let text = searchText.value;
        if (dt.innerText.includes(text)) {
          dt.style.display = "block";
        } else {
          dt.style.display = "none";
        }
      } else if (select.value == "content") {
        let text = searchText.value;
        if (dd.innerText.includes(text)) {
          dt.style.display = "block";
        } else {
          dt.style.display = "none";
        }
      } else if (select.value == "subCon") {
        let text = searchText.value;
        if (dd.innerText.includes(text)) {
          dt.style.display = "block";
        } else if (dt.innerText.includes(text)) {
          dt.style.display = "block";
        } else {
          dt.style.display = "none";
        }
      }
    });

    container.appendChild(dt);
    container.appendChild(dd);
    container.appendChild(deleteBtn);
    dlList.appendChild(container);
  });

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();
  // console.log(userData);

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

  const writeBtn = document.getElementById("writeBtn");
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  if (loginUser && loginUser.login == 1) {
    if (loginUser.id == "admin") {
      writeBtn.style.display = "display";
    } else {
      writeBtn.style.display = "none";
    }
  } else {
    writeBtn.style.display = "none";
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
