document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const faqItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("FAQ")) {
      const faqData = JSON.parse(localStorage.getItem(key));
      faqItems.push({
        id: key,
        title: faqData.title,
        content: faqData.content,
        category: faqData.category,
      });
    }
  }

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
});

const writeBtn = document.getElementById("writeBtn");
for (let i = 0; i < localStorage.length; i++) {
  const userData = JSON.parse(localStorage.getItem(i));

  if (userData === null) {
    continue;
  }
  if (userData.login == "1") {
    const userId = userData.id;
    console.log(userId);
    if (userId != "admin") {
      writeBtn.style.display = "none";
    }
  }
}

let logintext = document.getElementById("login");
let mypagetext = document.getElementById("mypage");

for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(i)).login == "1") {
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
      // console.log(JSON.parse(localStorage.getItem(i)).login);
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
