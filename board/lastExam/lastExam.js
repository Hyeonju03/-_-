document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 검색 버튼 클릭 시 처리하는 함수
  function handleSearch() {
    var searchTextValue = document
      .getElementById("searchText")
      .value.trim()
      .toLowerCase();
    var searchResults = document.getElementById("examList");

    // 모든 기출문제 목록을 가져옴
    var examLinks = document.querySelectorAll(".icon");

    // 결과를 저장할 배열
    var results = [];

    // 각 링크를 순회하면서 검색어가 포함된 경우 결과에 추가
    examLinks.forEach(function (link) {
      var fileName = link.textContent.trim().toLowerCase();
      if (fileName.includes(searchTextValue)) {
        results.push(
          `<div class="border-line"><h2>${link.outerHTML}</h2></div>`
        );
      }
    });

    // 검색 결과를 화면에 출력
    if (results.length > 0) {
      searchResults.innerHTML = results.join("");
    } else {
      searchResults.innerHTML = "검색 결과가 없습니다.";
    }
  }

  // 검색 버튼에 onclick 속성으로 함수 할당
  document.getElementById("searchBtn").onclick = handleSearch;

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
        writeBtn.href = "/board/writeTestReview/writeTestReview.html";
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
