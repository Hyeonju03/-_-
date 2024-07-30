document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // FAQ로 시작하면서 FAQno가 아닌애들 뽑아내기
  const faqItems = [];
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.startsWith("FAQ") && key != "FAQno") {
      const faqData = JSON.parse(localStorage.getItem(key));
      faqItems.push({
        id: key,
        title: faqData.title,
        content: faqData.content,
        category: faqData.category,
      });
    }
  }

  //
  const dlList = document.getElementById("faqList");
  faqItems.forEach((item, index) => {
    const container = document.createElement("div");
    container.classList.add("faq_item_container");

    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    const deleteBtn = document.createElement("button");

    dt.classList.add("faq_title");
    dd.classList.add("faq_view");
    deleteBtn.classList.add("commentBtn");

    deleteBtn.textContent = "삭제하기";
    dt.textContent = item.title;
    dd.textContent = item.content;
    dt.id = `dt${index}`;
    dd.style.display = "none";
    deleteBtn.style.display = "none";

    dt.addEventListener("click", () => {
      if (dd.style.display == "none") {
        dd.style.display = "block";
        ddclick(userData, dd, deleteBtn);
      } else {
        dd.style.display = "none";
        deleteBtn.style.display = "none";
      }

      deleteBtn.addEventListener("click", () => {
        for (let i = 0; i < localStorage.length; i++) {
          const local = JSON.parse(localStorage.getItem(`REVIEW${i}`));

          if (local) {
            if (local.title == dt.innerText) {
              window.localStorage.removeItem(`REVIEW${i}`);
              container.remove();
              alert("삭제되었습니다.");
            }
          }
        }
      });
    });
    container.appendChild(dt);
    container.appendChild(dd);
    container.appendChild(deleteBtn);
    dlList.appendChild(container);
  });

  // 버튼 클릭 시 동작
  const btns = document.querySelectorAll(".btn2");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.textContent.trim(); // 클릭한 버튼의 카테고리
      const containers = document.querySelectorAll(".faq_item_container");

      // 모든 FAQ 항목을 숨기기
      containers.forEach((container) => {
        container.style.display = "none";
      });

      // 클릭한 버튼의 카테고리와 일치하는 FAQ 항목만 보이기
      faqItems.forEach((item, index) => {
        if (item.category == category) {
          containers[index].style.display = "block";
        }
      });

      // 클릭한 버튼의 스타일 변경
      btns.forEach((b) => {
        b.style.backgroundColor = "white";
        b.style.color = "black";
      });
      btn.style.backgroundColor = "rgb(255, 183, 0)";
      btn.style.color = "white";
    });
  });

  // ///////////////////////////////////////////////////

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

// dt 클릭시 가릴것들과 안가릴것들
function ddclick(userData, dd, deleteBtn) {
  if (!dd || !deleteBtn) {
    console.error("입력 데이터 없음");
    return;
  }

  if (userData && userData.login == "1") {
    // admin이면 보여야할것 : deleteBtn textarea(활성화) dd
    // admin 아닌 유저 : textarea(비활성화) dd
    dd.style.display = "block";

    if (userData.id == "admin") {
      deleteBtn.style.display = "block";
    } else {
      deleteBtn.style.display = "none";
    }
  }
}
