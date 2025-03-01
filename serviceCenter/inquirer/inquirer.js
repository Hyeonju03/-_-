document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  let INQUIREno = parseInt(localStorage.getItem("INQUIREno")) || 0; // 현재 no 값 가져오기
  const writeBtn = document.getElementById("writeBtn");

  writeBtn.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("title-content").value;
    const select = document.getElementById("category");
    const category = select.options[select.selectedIndex].text;

    const inquire = {
      title: title,
      content: content,
      category: category,
      admincomment: "",
      userId: JSON.parse(sessionStorage.getItem("loginUser")).id,
    };

    localStorage.setItem(`INQUIRE${INQUIREno}`, JSON.stringify(inquire));
    alert("작성 완료 되었습니다.");

    // 다음 번호를 위해 no를 1 증가시키고 localStorage에 저장
    INQUIREno++;
    localStorage.setItem("INQUIREno", INQUIREno);

    window.location.href = "/serviceCenter/inquire/inquire.html";
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
        writeBtn.href = "/serviceCenter/inquire/inquire.html";
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
