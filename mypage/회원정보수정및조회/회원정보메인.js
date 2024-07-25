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
    img.src = `/mypage/imgs/프로필기본.png`;
  } else {
    img.src = `/mypage/imgs/${user.profile}`;
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
