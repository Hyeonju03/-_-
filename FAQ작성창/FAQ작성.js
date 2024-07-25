document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let no = parseInt(localStorage.getItem("no")) || 0; // 현재 no 값 가져오기

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

    localStorage.setItem(`FAQ${no}`, JSON.stringify(faq));
    alert("작성 완료 되었습니다.");

    // 다음 번호를 위해 no를 1 증가시키고 localStorage에 저장
    no++;
    localStorage.setItem("no", no);
  });
});

let logintext = document.getElementById("login");
let mypagetext = document.getElementById("mypage");

let loggedIn = false; // 로그인 상태를 토글할 변수

// 로그인 버튼 클릭 시
logintext.addEventListener("click", () => {
  if (!loggedIn) {
    // 로그인 상태로 변경
    logintext.innerText = "로그아웃";
    mypagetext.innerText = "마이페이지";
    loggedIn = true;

    // 로그아웃 클릭 시
    logintext.addEventListener("click", logoutHandler);
  } else {
    // 로그인 탭으로 이동
    window.location.href = "/login/2.로그인/로그인.html";
  }
});

// 로그아웃 핸들러
function logoutHandler() {
  // 글씨 바꾸기
  logintext.innerText = "로그인";
  mypagetext.innerText = "회원가입";

  // 로그인 상태 변경
  loggedIn = false;

  // 로컬스토리지에서 로그인 상태 수정
  for (let i = 0; i < localStorage.length; i++) {
    const item = JSON.parse(localStorage.getItem(i));
    if (item && item.login == "1") {
      item.login = "0";
      localStorage.setItem(i, JSON.stringify(item));
      break; // 첫 번째 찾은 항목만 수정하고 반복 중단
    }
  }

  // 두 번째 클릭 이벤트 제거
  logintext.removeEventListener("click", logoutHandler);
}

// for (let i = 0; i < localStorage.length; i++) {
//   const item = JSON.parse(localStorage.getItem(i)).login;
//   if (item && item.login == "1") {
//     logintext.innerText = "로그아웃";
//     mypagetext.innerText = "마이페이지";

//     //로그아웃 클릭시
//     logintext.addEventListener("click", () => {
//       // 글씨 바꾸기
//       logintext.innerText = "로그인";
//       mypagetext.innerText = "회원가입";
//       item.login = "0";
//       localStorage.setItem(i, JSON.stringify(item));

//       //한번 더 누르면
//       logintext.addEventListener("click", () => {
//         //로그인탭으로 이동
//         logintext.href = "/login/2.로그인/로그인.html";
//       });
//     });

//     //마이페이지 이동
//     mypagetext.addEventListener("click", () => {
//       mypagetext.href = "#";
//     });
//     break;
//   }
// }
