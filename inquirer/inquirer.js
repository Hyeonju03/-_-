document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let INQUIREno = parseInt(localStorage.getItem("INQUIREno")) || 0; // 현재 no 값 가져오기

  const writeBtn = document.getElementById("writeBtn");

  writeBtn.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("title-content").value;
    const select = document.getElementById("category");
    const category = select.options[select.selectedIndex].text;

    const inquire = {
      title: title,
      content: content,
      category: category,
      adminAnswer: 0,
    };

    //sessionStorage 로 비교해서 login 안되어있으면(데이터가 없다는 의미일듯?)
    //로그인먼저 해주세요alert 후 로그인페이지로 이동

    localStorage.setItem(`INQURE${INQUIREno}`, JSON.stringify(inquire));

    // 다음 번호를 위해 no를 1 증가시키고 localStorage에 저장
    INQUIREno++;
    localStorage.setItem("INQUIREno", INQUIREno);

    alert("작성 완료 되었습니다.");
    window.location.href = "/DCS_main/메인.html";
  });

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();

  if (userData && userData.login == "1") {
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
  localStorage.setItem(`user${getUserCount()}`, JSON.stringify(userData));
}

function getUserCount() {
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    count++;
  }
  return count;
}
