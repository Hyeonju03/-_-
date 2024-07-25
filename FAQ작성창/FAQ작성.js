document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let FAQno = parseInt(localStorage.getItem("FAQno")) || 0; // 현재 no 값 가져오기
  const writeBtn = document.getElementById("writeBtn");

  writeBtn.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("title-content").value;
    const select = document.getElementById("category");
    const category = select.options[select.selectedIndex].text;

    const faq = {
      title: title,
      content: content,
      category: category,
    };

    localStorage.setItem(`FAQ${FAQno}`, JSON.stringify(faq));
    alert("작성 완료 되었습니다.");

    // 다음 번호를 위해 no를 1 증가시키고 localStorage에 저장
    FAQno++;
    localStorage.setItem("FAQno", FAQno);
  });

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();
  console.log(userData);
  if (userData.login == "1") {
    // 로그인 상태일 때
    loginLink.innerText = "로그아웃";
    loginLink.addEventListener("click", () => {
      // 로그아웃 처리
      userData.login = "0";
      saveUserData(userData);
      location.reload(); // 페이지 새로고침
    });

    signupLink.innerText = "마이페이지";
    signupLink.href = "#";
  } else {
    // 로그아웃 상태일 때
    loginLink.innerText = "로그인";
    loginLink.href = "/login/2.로그인/로그인.html";

    signupLink.innerText = "회원가입";
    signupLink.href = "/login/1.회원가입/회원가입.html";
  }
});

function getUserData() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const userData = JSON.parse(localStorage.getItem(key));
    if (userData) {
      return userData;
    }
  }
  return null; // 사용자 데이터가 없거나 null인 경우
}

function saveUserData(userData) {
  sessionStorage.setItem(`loginUser`, JSON.stringify(userData));
}

// function getUserCount() {
//   let count = 0;
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     count++;
//   }
//   return count;
// }
