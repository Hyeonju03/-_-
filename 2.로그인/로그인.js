const userId = document.getElementById("logIn_id_text"); //아이디
const userPw = document.getElementById("logIn_pw_txt"); //비밀번호

//아이디 확인

userId.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (userId != JSON.parse(localStorage.getItem("user")).Id) {
      alert("존재하지 않는 아이디입니다.");
    }
    return true;
  }
});
//비밀번호 확인

const pwCheck = userPw.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (userId == JSON.parse(localStorage.getItem("info")).Id) {
      if (userPw != JSON.parse(localStorage.getItem("info")).Pw) {
        alert("비밀번호가 틀렸습니다.");
      }
    }
    return true;
  }
});

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
}

function login() {
  const res = validationCheck();
  if (res && idCheck && pwCheck) {
    window.location.href = "https://www.naver.com";
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
