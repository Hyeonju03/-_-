// 모달 함수
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("modalBtn");
  const closeBtn = document.getElementById("closebtn");
  const modal = document.getElementById("qModal");

  function toggleModal() {
    modal.classList.toggle("show");
  }

  openBtn.addEventListener("click", toggleModal);
  closeBtn.addEventListener("click", toggleModal);

  window.addEventListener("click", function (evernt) {
    if (evernt.target === modal) {
      toggleModal();
    }
  });
});

//아이디 찾기를 위한 객체
const pwId = document.getElementById("findPw_id");
const newPh = document.getElementById("findpw_ph");
const cerNo = document.getElementById("findPw_certi");

//아이디가 존재하는지 확인
let idConfirm = false;
function idCheck() {
  const inputId = pwId.value;
  let checkedId = [];
  for (let i = 0; i < localStorage.length; i++) {
    checkedId.push(JSON.parse(localStorage.getItem(i)).id); // 키가 0인거부터 순서대로 id를 담음
  }
  if (!checkedId.includes(inputId)) {
    alert("존재하지 않는 아이디입니다.");
    idConfirm = false;
    return false;
  } else {
    alert("아이디가 확인 되었습니다.");
    idConfirm = true;
    return true;
  }
}

// 아이디가 있는 키값
let keyNo = 0;
function keyCheck() {
  for (let key = 0; key < localStorage.length; key++) {
    const storeDate = JSON.parse(localStorage.getItem(key));
    if (storeDate && storeDate.id == pwId.value) {
      keyNo = key;
      return keyNo;
    }
  }
}
//전화번호 - 넣기
let phNo = "";
newPh.addEventListener("input", function () {
  const inputVal = this.value.replace(/[^0-9]/g, "");
  let result = "";
  let index = 0;
  for (let i = 0; i < inputVal.length; i++) {
    if (index === 3 || index === inputVal.length - 4) {
      result += "-";
    }
    result += inputVal[i];
    index++;
  }
  phNo = result.replaceAll("-", "");
  this.value = result;
  return phNo;
});

//전화번호 길이 확인
function phLength() {
  const expHp = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰 번호 형식 정규 표현식
  if (!expHp.test(newPh.value)) {
    alert(
      "휴대폰 번호 형식을 확인하세요. (예: 010-1234-5678, 10자리 또는 11자리)"
    );
    return false;
  }
  return true;
}

//인증번호 생성
function randomNo() {
  let random = "";
  while (random.length < 5) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
}

//인증번호 보내기
let phConfrim = false;
function sendSms() {
  keyNo = keyCheck();
  const phL = phLength();
  const userPh = JSON.parse(localStorage.getItem(keyNo)).phone; //스토리지에 있는 값
  //1. 번호가 일치하는지 확인
  if (phL && userPh != newPh.value) {
    alert("해당하는 번호가 존재하지 않습니다.");
    phConfrim = false;
    return false;
  }
  random = randomNo();
  console.log(random);
  //   const coolsms = require("coolsms-node-sdk").default;
  // const messageService = new coolsms(
  //   "NCS9L2EWZZQKBULJ",
  //   "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
  // );
  // messageService
  //   .sendOne({
  //     to: `${phNo}`,
  //     from: "01063640525",
  //     text: "SM 수 있습니다.",
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => console.error(err));
  phConfrim = true;
}

//인증번호 일치 확인
let ceConfirm = false;
function cerCheck() {
  if (random != cerNo.value) {
    alert("인증번호가 일치하지 않습니다.");
    ceConfirm = false;
  } else {
    alert("인증번호가 일치합니다.");
    ceConfirm = true;
  }
}

//유효성 검사를 위한 객체
const wId = document.getElementById("warnId");
const wPh = document.getElementById("warnPh");
const wCe = document.getElementById("warnCer");

function valCheck() {
  if (!pwId.value) {
    wId.classList.remove("hiddenSt");
    return false;
  } else {
    wId.classList.add("hiddenSt");
  }
  if (!newPh.value) {
    wPh.classList.remove("hiddenSt");
    return false;
  } else {
    wPh.classList.add("hiddenSt");
  }
  if (!cerNo.value) {
    wCe.classList.remove("hiddenSt");
    return false;
  } else {
    wCe.classList.add("hiddenSt");
  }
  return true;
}

function findPw() {
  const res = valCheck();
  if (res) {
    if (!idConfirm) {
      alert("아이디 확인버튼을 누르세요.");
      return;
    }
    if (!phConfrim) {
      alert("인증번호받기 버튼을 누르세요.");
      return;
    }
    if (!ceConfirm) {
      alert("인증번호 확인버튼을 누르세요.");
      return;
    }
    alert(
      `해당 아이디${pwId.value}의 비밀번호는${
        JSON.parse(localStorage.getItem(keyNo)).pw
      }입니다.`
    );
    return true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  ///////////////////////////////// 로그인 관련 ////////////////////////////////////

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();
  let keyNo = 0;
  function keyCheck() {
    for (let key = 0; key < localStorage.length; key++) {
      const storeDate = JSON.parse(localStorage.getItem(key));
      if (storeDate && storeDate.id == userData.id) {
        keyNo = key;
        return keyNo;
      }
    }
  }

  if (userData && userData.login) {
    keyNo = keyCheck();
    const user = JSON.parse(localStorage.getItem(keyNo));
    if (userData.login == "1" && user.delete == "0") {
      // 로그인 상태일 때
      loginLink.innerText = "로그아웃";
      loginLink.href = "#";
      loginLink.addEventListener("click", () => {
        // 로그아웃 처리
        userData.login = "0";
        saveUserData(userData);
        logoutUser(userData);
        sessionStorage.removeItem("loginUser");
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
