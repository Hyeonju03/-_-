document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//로그인을 한 상태
//로그인이 1인 회원의 정보를 보여주기
// function check() {
//   const allKeys = Object.keys(sessionStorage);
//   console.log("All keys in session storage:", allKeys);

//   const userkey = JSON.parse(sessionStorage.getItem());
//   console.log(userkey);
//   if (userkey) {
//     const key = JSON.parse(userkey).value;
//     // console.log(key);
//   } else {
//     console.log("No data found in session storage with the provided key.");
//   }
// }

// function idCheck() {
//   const inputId = userId.value;
//   let checkedId = [];
//   for (let i = 0; i < localStorage.length; i++) {
//     checkedId.push(JSON.parse(localStorage.getItem(i)).id); // 키가 0인거부터 순서대로 id를 담음
//   }
//   if (!checkedId.includes(inputId)) {
//     alert("아이디가 존재하지 않습니다.");
//     idConfirm = false;
//     return false;
//   }
//   idConfirm = true;
//   return true;
// }

//페이지 로드시 작동
document.addEventListener("DOMContentLoaded", function () {
  const id = document.getElementById("userId");
  const ph = document.getElementById("userPh");
  const name = document.getElementById("userName");
  const birth = document.getElementById("userBir");
  const email = document.getElementById("userEmail");
  const male = document.getElementById("gendM");
  const female = document.getElementById("gendW");

  id.innerText = JSON.parse(sessionStorage.getItem("loginUser")).id;
  ph.innerText = JSON.parse(sessionStorage.getItem("loginUser")).phone;
  name.innerText = JSON.parse(sessionStorage.getItem("loginUser")).name;
  birth.innerText = JSON.parse(sessionStorage.getItem("loginUser")).birth;
  email.innerText = JSON.parse(sessionStorage.getItem("loginUser")).email;
  if (JSON.parse(sessionStorage.getItem("loginUser")).gender === "남") {
    male.checked = true;
  } else if (JSON.parse(sessionStorage.getItem("loginUser")).gender === "여") {
    female.checked = true;
  }
});

// let keyNo = 0;
// function keyCheck() {
//   for (let key = 0; key < localStorage.length; key++) {
//     const storeDate = JSON.parse(localStorage.getItem(key));
//     if (storeDate && storeDate.id == userId.value) {
//       keyNo = key;
//       return keyNo;
//     }
//   }
// }

function pwCheck() {
  const res = keyCheck();
  const inputPw = userPw.value;
  const checkPw = JSON.parse(localStorage.getItem(res)).pw;
  if (inputPw != checkPw) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }
  return true;
}
