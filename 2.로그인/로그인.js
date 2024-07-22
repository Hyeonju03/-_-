const userId = document.getElementById("logIn_id_text"); //아이디
const userPw = document.getElementById("logIn_pw_txt"); //비밀번호

//아이디 확인
// const nId = document.getElementById("noId_modar");

function idCheck() {
  const inputId = userId.value;
  let checkedId = [];
  for (let i = 0; i < localStorage.length; i++) {
    checkedId.push(JSON.parse(localStorage.getItem(i)).id); // 키가 0인거부터 순서대로 id를 담음
  }
  if (!checkedId.includes(inputId)) {
    alert("존재하지 않는 아이디입니다.");
    return false;
  }
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
  let inputPw = userPw.value;
  let pw = JSON.parse(localStorage.getItem(res)).pw;
  if (inputPw != pw) {
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
  const idC = idCheck();
  const pwC = pwCheck();
  const loginState = JSON.parse(localStorage.getItem(keyNo));
  if (res && idC && pwC) {
    //메인사이트로 이동하게 링크 바꾸기.
    loginState.login = "1";
    localStorage.setItem(keyNo, JSON.stringify(loginState));
    window.location.href =
      "http://192.168.0.33:5501/project--/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80/%EB%A9%94%EC%9D%B8.html";
  }
  // else {
  //   // alert("오류발생");
  // }
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

//회원가입 누르면 회원가입 창으로 이동
function goSignUp() {
  window.history.back();
  window.location.href =
    "http://192.168.0.33:5501/1.%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.html";
}
