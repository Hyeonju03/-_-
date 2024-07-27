document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//페이지 로드시 작동
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  if (user == null) {
    alert("로그인 후 이용가능합니다.");
    window.location.href = "/login/2.로그인/로그인.html";
  }

  const id = document.getElementById("userId");
  const ph = document.getElementById("userPh");
  const name = document.getElementById("userName");
  const birth = document.getElementById("userBir");
  const email = document.getElementById("userEmail");
  const male = document.getElementById("gendM");
  const female = document.getElementById("gendW");

  id.innerText = user.id;
  ph.innerText = user.phone;
  name.innerText = user.name;
  birth.innerText = user.birth;
  email.innerText = user.email;
  if (user.gender === "남") {
    male.checked = true;
  } else if (user.gender === "여") {
    female.checked = true;
  }

  //프로필 사진
  const img = document.getElementById("profile");
  if (user.profile == 0) {
    img.src = `/imgs/프로필기본.png`;
  } else {
    img.src = `/imgs/${user.profile}`;
  }
});

//사진 등록 누를시 알림창
function cgProfile() {
  alert("프로필은 수정하기 버튼을 누른 후 이용 가능합니다.");
}

//수정하기 누르면 비밀번호 확인 창으로 이동
function edit() {
  window.location.href = "/mypage/회원정보수정및조회/비밀번호확인.html";
}

//로그인 로그아웃 글자 변경
const loginLink = document.getElementById("login");
document.addEventListener("DOMContentLoaded", function () {
  const Login = JSON.parse(sessionStorage.getItem("loginUser"));
  //만약 로그인된 유저(세션로컬리지)에 데이터가 없는경우
  console.log("로그인상태", login);
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
