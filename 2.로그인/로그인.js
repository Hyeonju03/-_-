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
  return inputId;
}

//비밀번호 확인
function pwCheck() {
  const inputPw = userPw.value;
  let checkedPw = [];
  for (let i = 0; i < localStorage.length; i++) {
    checkedPw.push(JSON.parse(localStorage.getItem(i)).pw); // 키가 0인거부터 순서대로 id를 담음
  }
  if (!checkedPw.includes(inputPw)) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }
  return inputPw;
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
  if (res && idC && pwC) {
    //메인사이트로 이동하게 링크 바꾸기.
    window.location.href = "#";
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
