document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//비밀번호 타입 txt로 변경
let count = 1;
function pwEye() {
  if (count % 2 != 0) {
    pw.type = "text";
  } else {
    pw.type = "password";
  }
  count++;
}

let count2 = 1;
function pwEye2() {
  if (count2 % 2 != 0) {
    pwC.type = "text";
  } else {
    pwC.type = "password";
  }
  count2++;
}

//비밀번호 확인을 위한 변수
const pw = document.getElementById("editPw"); // 입력한 비번
const pwC = document.getElementById("editPwCk"); // 입력한 재비번
let user = JSON.parse(sessionStorage.getItem("loginUser"));
//유효성 검증
function validation() {
  const wPw = document.getElementById("warnPw");
  const wPwC = document.getElementById("warnPwChek");
  if (!pw.value) {
    wPw.classList.remove("warn");
    return false;
  } else {
    wPw.classList.add("warn");
  }
  if (!pwC.value) {
    wPwC.classList.remove("warn");
    ㅁ;
  } else {
    wPwC.classList.add("warn");
  }
  return true;
}

//비밀번호 확인
function chekEditPw() {
  const val = validation();
  if (val) {
    if (user.pw != pw.value) {
      alert("해당 비밀번호는 존재하지 않습니다.");
      return;
    } else {
      if (pw.value != pwC.value) {
        alert("비밀번호와 재입력한 비밀번호가 일치하지 않습니다.");
        return;
      } else {
        alert("비밀번호 확인 완료");
        window.location.href = "/mypage/회원정보수정및조회/회원정보수정.html";
      }
    }
  }
}
/////////////////////////// 이부분 뭔지 모르겠음..//////////
// //로그인 로그아웃 글자 변경
// const loginLink = document.getElementById("login");
// document.addEventListener("DOMContentLoaded", function () {
//   const Login = JSON.parse(sessionStorage.getItem("loginUser"));
//   //만약 로그인된 유저(세션로컬리지)에 데이터가 없는경우
//   console.log("로그인상태", login);
//   if (!Login) {
//     //비로그인상태
//     loginLink.innerText = "로그인";
//     linkMove();
//   } else {
//     //로그인상태
//     linkMove();
//     loginLink.innerText = "로그아웃";
//   }
// });

// //글자를 확인하고 그에 맞는 링크로 이동하기
// function linkMove() {
//   const linkText = loginLink.textContent; //a 태그에 있는 내용
//   if (linkText == "로그인") {
//     loginLink.href = "/login/2.로그인/로그인.html";
//   } else {
//     //메인페이지링크 넣기
//     loginLink.href = "/mypage/메인페이지/메인.html";
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
