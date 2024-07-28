document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  const date = document.getElementById("cerDate"); // 자격증 취득일에 들어온 값
  const org = document.getElementById("cerAgency"); // 자격증 발행기관에 들어온 값
  const cname = document.getElementById("cerName"); // 자격증 이름에 들어온 값

  let CERno = parseInt(localStorage.getItem("CERno")) || 0;

  addBtn.addEventListener("click", () => {
    if (!cname.value && !date.value && !org.value) {
      alert("추가된 내용이 없습니다.");
      window.location.href = "/mypage/취득자격증/취득자격증확인.html";
    } else {
      const res = validation();
      if (res) {
        cer = {
          id: user.id,
          cerName: cname.value,
          cerDate: date.value,
          cerOrg: org.value,
        };
        console.log(cer);
        localStorage.setItem(`cer${CERno}`, JSON.stringify(cer));
        alert("자격증 추가 완료");
        // window.location.href = "/mypage/취득자격증/취득자격증확인.html";
        CERno++;
        localStorage.setItem("CERno", CERno);
      }
    }
  });

  if (user == null) {
    alert("로그인 후 이용가능합니다.");
    window.location.href = "/login/2.로그인/로그인.html";
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

// //////////////////////

let cer = {
  id: "",
  cerName: "",
  cerDate: "",
  cerOrg: "",
};

//키값 설정

//유효성
const cname = document.getElementById("cerName"); // 자격증 이름에 들어온 값
const warnC = document.getElementById("warnName");
function validation() {
  if (!cname.value) {
    warnC.classList.remove("warn");
    return false;
  } else {
    warnC.classList.add("warn");
  }
  return true;
}
