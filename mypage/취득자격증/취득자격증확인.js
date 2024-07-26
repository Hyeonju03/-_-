document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const loginuser = JSON.parse(sessionStorage.getItem("loginUser"));
  if (loginuser == null) {
    alert("로그인 후 이용가능합니다.");
    window.location.href = "/login/2.로그인/로그인.html";
  }

  //cer로 시작 하고 찾은 키의 id가 현재 session id랑 같은 키만 가지고 올거임.
  const cerItem = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const user = JSON.parse(localStorage.getItem(key));
    if (key.startsWith("cer")) {
      if (user.id == loginuser.id) {
        cerItem.push({
          cerName: user.cerName,
          cerDate: user.cerDate,
          org: user.cerOrg,
        });
      }
    }
  }

  cerItem.forEach((item, index) => {
    const cerList = document.getElementById("tbodyList");
    const row = document.createElement("tr");

    const nameCol = document.createElement("td");
    nameCol.classList.add("aqCerRows");
    nameCol.textContent = item.cerName;
    row.appendChild(nameCol);

    const dateCol = document.createElement("td");
    dateCol.classList.add("aqCerRows");
    dateCol.textContent = item.cerDate;
    row.appendChild(dateCol);

    const orgCol = document.createElement("td");
    orgCol.classList.add("aqCerRows");
    orgCol.textContent = item.org;
    row.appendChild(orgCol);

    cerList.appendChild(row);
  });

  // 유저의 아이디랑 로컬cer[0]에 있는 아이디랑 비교
});

// 화면 위에 로그인 로그아웃
const loginLink = document.getElementById("login");
document.addEventListener("DOMContentLoaded", function () {
  const Login = JSON.parse(sessionStorage.getItem("loginUser"));
  //만약 로그인된 유저(세션로컬리지)에 데이터가 없는경우
  if (!Login) {
    //비로그인상태
    loginLink.innerText = "로그인";
    loginLink.href = "/login/2.로그인/로그인.html";
  } else {
    //로그인상태
    loginLink.innerText = "로그아웃";
    console.log("유저키 확인용", userKey);
    loginLink.addEventListener("click", function () {
      const cerKey = findKey();
      const user = JSON.parse(localStorage.getItem(cerKey));
      user.login = "0";
      localStorage.setItem(cerKey, JSON.stringify(user));
      sessionStorage.removeItem("loginUser");
      window.location.href = "/main/메인.html";
    });
  }
});

const userKey = 0;
function findKey() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const user = JSON.parse(localStorage.getItem(key));
    if (key.startsWith("cer")) {
      if (user.id == loginuser.id) {
        userKey = i;
      }
    }
    console.log("유저의키는", userKey);
    return userKey;
  }
}
