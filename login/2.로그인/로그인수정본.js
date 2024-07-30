const userId = document.getElementById("logIn_id_text"); //아이디
const userPw = document.getElementById("logIn_pw_txt"); //비밀번호

//아이디 확인
let idConfirm = 0;
function idCheck() {
  const inputId = userId.value;
  let checkedId = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(key));
    if (!item || !item.id) {
      continue;
    }
    checkedId.push(item.id);
  }

  const res = keyCheck();
  const deleteUser = JSON.parse(localStorage.getItem(res)).delete;
  if (!checkedId.includes(inputId)) {
    alert("아이디가 존재하지 않습니다.");
    idConfirm = false;
    return false;
  }
  //입력한 아이디가 탈퇴한 유저일 경우
  if (deleteUser == "1") {
    alert("탈퇴한 유저입니다.");
    idConfirm = false;
    return false;
  }
  idConfirm = true;
  return true;
}

// 아이디가 있는 키값
let key = 0;
function keyCheck() {
  for (let i = 0; i < localStorage.length; i++) {
    const storeDate = localStorage.getItem(i);
    if (storeDate === null) {
      continue;
    }
    try {
      const userDate = JSON.parse(storeDate);
      const id = userDate.id;
      if (id === userId.value) {
        key = i;
        return key;
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  }
  return key;
}

//비밀번호 다시
function pwCheck() {
  const res = keyCheck();
  const inputPw = userPw.value;
  const checkPw = JSON.parse(localStorage.getItem(res)).pw;
  if (inputPw != checkPw) {
    console.log("비밀번호 확인키", res);
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
  const id = idCheck();
  const loginState = JSON.parse(localStorage.getItem(key));
  if (res) {
    if (id) {
      const pw = pwCheck();
      if (pw) {
        //메인사이트로 이동하게 링크 바꾸기.
        loginState.login = "1";
        localStorage.setItem(key, JSON.stringify(loginState));
        sessionStorage.setItem("loginUser", JSON.stringify(loginState));
        window.location.href = "/DCS_main/메인.html";
      }
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
