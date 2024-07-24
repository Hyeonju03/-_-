document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

for (let i = 0; i < localStorage.length; i++) {
  console.log(JSON.parse(localStorage.getItem(0)).login);
}

let logintext = document.getElementById("login");
let mypagetext = document.getElementById("mypage");
console.log(logintext);
for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(i)).login) {
    // 로그인시 뜨는거
    logintext.innerText = "로그아웃";
    mypagetext.innerText = "마이페이지";

    //로그아웃 클릭시
    logintext.addEventListener("click", () => {
      // 글씨 바꾸기
      logintext.innerText = "로그인";
      mypagetext.innerText = "회원가입";
      const item = JSON.parse(localStorage.getItem(i));
      item.login = "0";
      localStorage.setItem(i, JSON.stringify(item));
      console.log(JSON.parse(localStorage.getItem(i)).login);
      // 이거 1나옴 왜지?

      //한번 더 누르면
      logintext.addEventListener("click", () => {
        //로그아웃탭으로 이동
        logintext.href = "/login/2.로그인/로그인.html";
      });
    });

    //마이페이지 이동
    mypagetext.addEventListener("click", () => {
      mypagetext.href = "#";
    });
  }
}
