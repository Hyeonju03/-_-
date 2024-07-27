document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  if (user == null) {
    alert("로그인 후 이용가능합니다.");
    window.location.href = "/login/2.로그인/로그인.html";
  }
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//비밀번호 확인을 위한 변수
const pw = document.getElementById("quitPw"); // 입력한 비번
const pwC = document.getElementById("quitPwCk"); // 입력한 재비번
let login = JSON.parse(sessionStorage.getItem("loginUser"));

//눈 모양 누르면 비밀번호 보이게
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


//유효성검증
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

//로그인한 유젖의 로컬 키값 찾기
let keyNo = 0;
function keyCheck() {
  for (let key = 0; key < localStorage.length; key++) {
    const storeDate = JSON.parse(localStorage.getItem(key));
    if (storeDate && storeDate.id == login.id) {
      keyNo = key;
      return keyNo;
    }
  }
}

//비밀번호가 로그인한 비밀번호랑 일치하는지
function quitPage() {
  keyNo=keyCheck();
  const user = JSON.parse(localStorage.getItem(keyNo));
  const val = validation();
  if (val) {
    if (login.pw != pw.value) {
      alert("해당 비밀번호는 존재하지 않습니다.");
      return;
    } else {
      if (pw.value != pwC.value) {
        alert("비밀번호와 재입력한 비밀번호가 일치하지 않습니다.");
        return;
      } else {
        alert("비밀번호 확인 완료");

        if (confirm("진짜로 탈퇴하시겠습니까?")) {
          // '예'를 누른 경우
          user.delete="1"
          localStorage.setItem(keyNo, JSON.stringify(user))
          alert('탈퇴되었습니다.');
          // 메인 화면으로 이동 (예: index.html)
          window.location.href = '/DCS_main/메인.html';
        } else {
          // '아니오'를 누른 경우
          alert('탈퇴가 취소되었습니다.');
          // 마이페이지로 이동
          window.location.href = '/mypage/회원정보수정및조회/회원정보메인.html';
        }
      }
    }
  }
}
