document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // REVIEW로 시작하면서 REVIEWno가 아닌애들 뽑아내기
  const testReviewItems = [];
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.startsWith("REVIEW") && key != "REVIEWno") {
      const testReviewItemsData = JSON.parse(localStorage.getItem(key));
      testReviewItems.push({
        title: testReviewItemsData.title,
        content: testReviewItemsData.content,
        category: testReviewItemsData.category,
        id: testReviewItemsData.id,
      });
    }
  }

  //
  const dlList = document.getElementById("testReviewList");

  // if (dlList) {
  testReviewItems.forEach((item, index) => {
    let userData = getUserData();
    const container = document.createElement("div");
    container.classList.add("testReview_item_container");

    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    // 작성자 이름
    const p = document.createElement("p");
    const deleteBtn = document.createElement("button");

    p.classList.add("testReview_userid");
    dt.classList.add("testReview_title");
    dd.classList.add("testReview_view");
    deleteBtn.classList.add("commentBtn");

    createBtn.textContent = "저장하기";
    deleteBtn.textContent = "삭제하기";
    p.textContent = `작성자: ${item.userId}`;
    dt.textContent = item.title;
    dd.textContent = item.content;
    dd.appendChild(p);

    dt.id = `dt${index}`;
    dd.style.display = "none";
    deleteBtn.style.display = "none";

    // 조건에 맞게 dt 보이기
    dt.style.display = "none";
    if (userData && userData.login == "1") {
      if (userData.id == "admin") {
        dt.style.display = "block";
      } else {
        if (userData.id == item.userId) {
          dt.style.display = "block";
        } else {
          dt.style.display = "none";
        }
      }
    }

    //dt 클릭하면 실행
    dt.addEventListener("click", () => {
      //dd가 none이면
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
  // } else {
  //   console.error("오류");
  // }

  // 버튼 클릭 시 동작
  const btns = document.querySelectorAll(".btn2");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.textContent.trim(); // 클릭한 버튼의 카테고리
      const containers = document.querySelectorAll(
        ".testReview_item_container"
      );

      // 모든 testReview 항목을 숨기기
      containers.forEach((container) => {
        container.style.display = "none";
      });

      // 클릭한 버튼의 카테고리와 일치하는 testReview 항목만 보이기
      testReviewItems.forEach((item, index) => {
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

  // dt 클릭시 가릴것들과 안가릴것들
  function ddclick(userData, dd, textarea, createBtn, deleteBtn) {
    if (!dd || !textarea || !createBtn || !deleteBtn) {
      console.error("입력 데이터 없음");
      return;
    }

    if (userData && userData.login == "1") {
      // admin이면 보여야할것 : createBtn deleteBtn textarea(활성화) dd
      // admin 아닌 유저 : textarea(비활성화) dd
      dd.style.display = "block";

      if (userData.id == "admin") {
        deleteBtn.style.display = "block";
      } else {
        deleteBtn.style.display = "none";
      }
    } else {
      dd.style.display = "none";
    }
  }

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

  if (!loginUser) {
    writeBtn.addEventListener("click", () => {
      alert("로그인이 필요한 작업입니다.");
      writeBtn.href = "/login/2.로그인/로그인.html";
    });
  } else {
    if (loginUser.login == 0) {
      writeBtn.addEventListener("click", () => {
        alert("로그인이 필요한 작업입니다.");
        writeBtn.href = "/login/2.로그인/로그인.html";
      });
    } else {
      writeBtn.addEventListener("click", () => {
        writeBtn.href = "/writeTestReview/writeTestReview.html";
      });
    }
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
