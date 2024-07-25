document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // FAQ로 시작하면서 FAQno가 아닌애들 뽑아내기
  const faqItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("FAQ") && key != "FAQno") {
      const faqData = JSON.parse(localStorage.getItem(key));
      faqItems.push({
        id: key,
        title: faqData.title,
        content: faqData.content,
        category: faqData.category,
      });
    }
  }

  //
  const dlList = document.getElementById("faqList");
  faqItems.forEach((item, index) => {
    const container = document.createElement("div");
    container.classList.add("faq_item_container");

    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.classList.add("faq_title");
    dd.classList.add("faq_view");
    dt.textContent = item.title;
    dd.textContent = item.content;
    dt.id = `dt${index}`;
    dd.style.display = "none";

    dt.addEventListener("click", () => {
      if (dd.style.display == "none") {
        dd.style.display = "block";
      } else {
        dd.style.display = "none";
      }
    });

    container.appendChild(dt);
    container.appendChild(dd);
    dlList.appendChild(container);
    console.log(container);
  });

  // 버튼 클릭 시 동작
  const btns = document.querySelectorAll(".btn2");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.textContent.trim(); // 클릭한 버튼의 카테고리
      const containers = document.querySelectorAll(".faq_item_container");

      // 모든 FAQ 항목을 숨기기
      containers.forEach((container) => {
        container.style.display = "none";
      });

      // 클릭한 버튼의 카테고리와 일치하는 FAQ 항목만 보이기
      faqItems.forEach((item, index) => {
        if (item.category == category) {
          containers[index].style.display = "block";
        }
      });

      // 클릭한 버튼의 스타일 변경
      btns.forEach((b) => {
        b.style.backgroundColor = "white";
        b.style.color = "black";
      });
      btn.style.backgroundColor = "rgb(255, 183, 0)";
      btn.style.color = "white";
    });
  });

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();

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

  const writeBtn = document.getElementById("writeBtn");
  console.log(getUserData());

  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  if (loginUser.login == 1) {
    if (loginUser.id == "admin") {
      writeBtn.style.display = "display";
    } else {
      writeBtn.style.display = "none";
    }
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
