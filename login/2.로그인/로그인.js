const userId = document.getElementById("logIn_id_text"); //아이디
const userPw = document.getElementById("logIn_pw_txt"); //비밀번호

//아이디 확인
// const nId = document.getElementById("noId_modar");
let idConfirm = 0;
function idCheck() {
  const inputId = userId.value;
  let checkedId = [];
  for (let i = 0; i < localStorage.length; i++) {
    checkedId.push(JSON.parse(localStorage.getItem(i)).id); // 키가 0인거부터 순서대로 id를 담음
  }
  if (!checkedId.includes(inputId)) {
    alert("아이디가 존재하지 않습니다.");
    idConfirm = false;
    return false;
  }
  idConfirm = true;
  return true;
}

// 아이디가 있는 키값
let keyNo = 0;
function keyCheck() {
  for (let key = 0; key < localStorage.length; key++) {
    const storeDate = JSON.parse(localStorage.getItem(key));
    if (storeDate && storeDate.id == userId.value) {
      keyNo = key;
      return keyNo;
    }
  }
}

//비밀번호 다시
function pwCheck() {
  const res = keyCheck();
  const inputPw = userPw.value;
  const checkPw = JSON.parse(localStorage.getItem(res)).pw;
  if (inputPw != checkPw) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }
  return true;
}

//유효성검사
const wId = document.getElementById("wUserId");
const wPw = document.getElementById("wUserPw");
function validationCheck() {
  if (!userId.value) {
    wId.classList.remove("hidden");
    return false;
  } else {
    wId.classList.add("hidden");
  }

  if (!userPw.value) {
    wPw.classList.remove("hidden");
    return false;
  } else {
    wPw.classList.add("hidden");
  }
  return true;
}

//로그인 버튼 눌렀을 때
function login() {
  const res = validationCheck();
  const loginState = JSON.parse(localStorage.getItem(keyNo));
  if (res) {
    const id = idCheck();
    const pw = pwCheck();
    if (id & pw) {
      //메인사이트로 이동하게 링크 바꾸기.
      loginState.login = "1";
      localStorage.setItem(keyNo, JSON.stringify(loginState));
      sessionStorage.setItem("loginUser", JSON.stringify(loginState));
      window.location.href = "/mypage/메인페이지/메인.html";
    }
  }
}

let count = 1;
function pwEye() {
  if (count % 2 != 0) {
    userPw.type = "text";
  } else {
    userPw.type = "password";
  }
  count++;
}

document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
