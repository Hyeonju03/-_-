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
    return false;
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
