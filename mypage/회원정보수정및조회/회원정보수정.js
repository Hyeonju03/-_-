document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// 프로필 사진 변경
function cgProfile(e) {
  const files = e.currentTarget.files;
  const img = document.getElementById("profile");
  img.src = `/project-main/imgs/${files[0].name}`;
}

const upload = document.getElementById("profileUp");
const uploadBtn = document.querySelector(".fileUp");

// uploadBtn.addEventListener("click", () => upload.click());
upload.addEventListener("change", cgProfile);

//아이디
//로그인이 1상태이고, 비밀번호 확인도 한 상태이고, 아이디도 확인해야 함
