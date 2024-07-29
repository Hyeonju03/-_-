// 모달창을 띄우기 위한 함수들

document.addEventListener("DOMContentLoaded", function () {
  const modalBtn = document.getElementById("modalBtn");
  const modal = document.getElementById("q_Modal");
  const closeBt = document.getElementById("closebtn");

  function toggleModal() {
    modal.classList.toggle("show");
  }

  modalBtn.addEventListener("click", toggleModal);
  closeBt.addEventListener("click", toggleModal);

  window.addEventListener("click", function (evernt) {
    if (evernt.target === modal) {
      toggleModal();
    }
  });
});

//아이디 찾기를 위한 객체
const newName = document.getElementById("findId_name");
const newPh = document.getElementById("findId_ph");
const cerNo = document.getElementById("findId_certi");

//이름 입력시 로컬에 있는지 확인
function nameCheck() {
  const inputName = newName.value;
  let checkedName = [];
  for (let i = 0; i < localStorage.length; i++) {
    checkedName.push(JSON.parse(localStorage.getItem(i)).name); // 키가 0인거부터 순서대로 name를 담음
  }
  if (!checkedName.includes(inputName)) {
    alert("일치하는 이름이 없습니다.");
    return false;
  }
  return true;
}

//이름을 통해서 키값들 찾기 (동명이인인 경우를 대비하여 배열로 받음)
let keyObj = [];
function keyCheck() {
  for (let key = 0; key < localStorage.length; key++) {
    const storeDate = JSON.parse(localStorage.getItem(key));
    if (storeDate.name == newName.value) {
      keyObj.push(key);
    }
  }
  return keyObj;
}

//전화번호 하이픈 넣기
let phNo = ""; //문자전송을 위해 하이픈 제거
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

//이름이랑 번호가 일치하는지 확인
function namePhCheck() {
  const res = keyCheck();
  let inputPh = newPh.value;
  let checkPj = []; // 동명이인일 경우 해당 키의 전화번호를 전부 저장
  for (item of res) {
    checkPj.push(JSON.parse(localStorage.getItem(item)).phone);
  }
  if (checkPj.includes(inputPh)) {
    alert("전화번호가 일치합니다.");
    return true;
  } else {
    alert("전화번호가 일치하지 않습니다.");
    return false;
  }
}

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

//아이디와 전화번호가 일치하는 키 값을 찾아내기
let key = 0;
function findKey() {
  for (let i = 0; i < localStorage.length; i++) {
    const storeDate = JSON.parse(localStorage.getItem(i));
    if (storeDate && storeDate.phone == newPh.value) {
      keyNo = i;
      return keyNo;
    }
  }
}

//인증번호 생성
function randomNo() {
  let random = ""; //랜덤으로 생성되는 숫자
  while (random.length < 5) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
}

//인증번호 보내기
let random = ""; // 숫자고정해서 인증번호 확인하기 위한 변수
let phConfrim = false;
function sendSms() {
  const res = phLength();
  if (res) {
    const ph = namePhCheck();
    if (ph) {
      ran = randomNo();
      console.log(ran);
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
      random = ran;
      return random;
    }
  }
}

//인증번호 일치 확인
let ceConfirm = false;
function cerCheck() {
  if (random != cerNo.value) {
    alert("인증번호가 일치하지 않습니다.");
    ceConfirm = false;
  } else {
    alert("인증번호가 일치합니다.");
    console.log(cerNo.value);
    ceConfirm = true;
  }
}

//유효성 검사
const wName = document.getElementById("warnName");
const wPh = document.getElementById("warnPh");
const wCer = document.getElementById("warnCer");

function vaCheck() {
  if (!newName.value) {
    wName.classList.remove("hiddenSt");
    return false;
  } else {
    wName.classList.add("hiddenSt");
  }
  if (!newPh.value) {
    wPh.classList.remove("hiddenSt");
    return false;
  } else {
    wPh.classList.add("hiddenSt");
  }
  if (!cerNo.value) {
    wCer.classList.remove("hiddenSt");
    return false;
  } else {
    wCer.classList.add("hiddenSt");
  }
  return true;
}

//아이디 확인
function findId() {
  const val = vaCheck();
  if (val) {
    const name = nameCheck();
    if (name) {
      if (!phConfrim) {
        alert("인증번호받기 버튼을 눌러주세요.");
        return;
      }
      if (!ceConfirm) {
        alert("인증번호 확인 버튼을 눌러주세요.");
        return;
      }
      alert(
        `가입하신 아이디는 ${
          JSON.parse(localStorage.getItem(findKey())).id
        }입니다.`
      );
    }
  }
}

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
