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
});

//페이지에 들어왔을 때 로그인이 안되어있으면 로그인 화면으로 이동
// document.addEventListener("DOMContentLoaded", function () {
//   const user = JSON.parse(sessionStorage.getItem("loginUser"));
//   if (user == null) {
//     alert("로그인 후 이용가능합니다.");
//     window.location.href = "/login/2.로그인/로그인.html";
//   }
// });
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

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  if (user == null) {
    alert("로그인 후 이용가능합니다.");
    window.location.href = "/login/2.로그인/로그인.html";
  }
});

const loginLink = document.getElementById("login");
document.addEventListener("DOMContentLoaded", function () {
  const Login = JSON.parse(sessionStorage.getItem("loginUser"));
  //만약 로그인된 유저(세션로컬리지)에 데이터가 없는경우
  if (!Login) {
    //비로그인상태
    loginLink.innerText = "로그인";
    linkMove();
  } else {
    //로그인상태
    linkMove();
    loginLink.innerText = "로그아웃";
  }
});

//글자를 확인하고 그에 맞는 링크로 이동하기
function linkMove() {
  const linkText = loginLink.textContent; //a 태그에 있는 내용
  if (linkText == "로그인") {
    loginLink.href = "/login/2.로그인/로그인.html";
  } else {
    //메인페이지링크 넣기
    loginLink.href = "/mypage/메인페이지/메인.html";
  }
}
