// 현재 로그인한 유저
const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

// 프로필 사진 변경
let newProfile = "0";
function cgProfile(e) {
  const files = e.currentTarget.files;
  img.src = `/mypage/imgs/${files[0].name}`;
  newProfile = files[0].name;
  return newProfile;
}

const upload = document.getElementById("profileUp");
const uploadBtn = document.querySelector(".fileUp");
upload.addEventListener("change", cgProfile);

// 입력받는 정보 변수
const id = document.getElementById("userId");
const pw = document.getElementById("userPw");
const pwC = document.getElementById("pwCk");
const email = document.getElementById("userEmail");
const male = document.getElementById("gendM");
const female = document.getElementById("gendW");
const loginName = document.getElementById("userName");
const ph = document.getElementById("userPh");
const phC = document.getElementById("userCer");
const birth = document.getElementById("userBirth");
const img = document.getElementById("profile");

//유효성 검사를 위한 변수
const warnPwc = document.getElementById("warnPwC");

//창이 열렸을 때 로그인한 회원 정보가 뜨게

document.addEventListener("DOMContentLoaded", function () {
  //로그인 안했으면 로그인창으로 이동
  if (loginUser == null) {
    alert("로그인 후 이용가능합니다.");
    window.location.href = "/login/2.로그인/로그인.html";
  }
  id.value = loginUser.id;
  ph.value = loginUser.phone;
  loginName.value = loginUser.name;
  birth.value = loginUser.birth;
  email.value = loginUser.email;
  if (loginUser.gender === "남") {
    male.checked = true;
  } else if (loginUser.gender === "여") {
    female.checked = true;
  }
  if (loginUser.profile == 0) {
    img.src = `/mypage/imgs/프로필기본.png`;
  } else {
    img.src = `/mypage/imgs/${loginUser.profile}`;
  }
});

//비밀번호 보이게
let count = 1;
function pwEye() {
  if (count % 2 != 0) {
    pw.type = "text";
  } else {
    pw.type = "password";
  }
  count++;
}

let count2 = 1;
function pwEye2() {
  if (count2 % 2 != 0) {
    pwC.type = "text";
  } else {
    pwC.type = "password";
  }
  count2++;
}

//비밀번호 입력시
let pwConfrim = false;
let originPw = JSON.parse(sessionStorage.getItem("loginUser")).pw; //비밀번호가 바뀌면 변경해주기 위해 선언
function checkPw() {
  if (!pw.value && !pwC.value) {
    pwConfrim = true;
    return true;
  }
  if (pw.value != pwC.value) {
    warnPwc.classList.remove("warn");
    pwConfrim = false;
    return false;
  } else {
    warnPwc.classList.add("warn");
    pwConfrim = true;
    originPw = pw.value;
    return true;
  }
}

//인증번호 전송 조건
//1. 전화번호 하이픈 넣기
let phNo = ""; //문자전송을 위해 하이픈 제거
ph.addEventListener("input", function () {
  const inputVal = this.value.replace(/[^0-9]/g, "");
  let result = "";
  let index = 0;
  for (let i = 0; i < inputVal.length; i++) {
    if (index === 3 || index === inputVal.length - 4) {
      result += "-";
    }
    result += inputVal[i];
    index++;
  }
  phNo = result.replaceAll("-", "");
  this.value = result;
  return phNo;
});

//2. 전화번호 형식 확인
function phLength() {
  const expHp = /^\d{3}-\d{3,4}-\d{4}$/;
  if (!expHp.test(ph.value)) {
    alert(
      "휴대폰 번호 형식을 확인하세요. (예: 010-1234-5678, 10자리 또는 11자리)"
    );
    return false;
  }
  return true;
}

//로컬에 있는 번호로 바꿀 수 없게 막기
function comparePh() {
  const newPh = ph.value; // 변경하려고 하는 전화번호
  let checkPh = []; // 비교할 로컬 전화번호 목록
  for (let i = 0; i < localStorage.length; i++) {
    const storedPh = localStorage.getItem(i);
    if (storedPh === null) {
      console.log(`로컬 스토리지에서 ${i} 인덱스의 데이터가 null입니다.`);
      continue; // null일 경우 다음 반복으로 넘어감
    }
    try {
      const userData = JSON.parse(storedPh);
      const userPhone = userData.phone;
      if (userPhone) {
        // phone 필드가 유효한 경우에만 배열에 추가
        checkPh.push(userPhone);
      }
    } catch (error) {
      console.error(`로컬 스토리지 데이터 처리 중 오류 발생: ${error.message}`);
      // 예외 처리
    }
  }
  if (checkPh.includes(newPh) && loginUser.phone != ph.value) {
    alert("이미 사용중인 전화번호 입니다.");
    return false;
  }
  return true;
}

//랜덤 번호 생성
function randomNo() {
  let random = "";
  while (random.length < 5) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
}

//입력된 전화번호랑 기존 번호가 같은지 확인
function newPh() {
  if (ph.value == loginUser.phone) {
    alert("현재 사용하고 계신 전화번호입니다.");
    return false;
  } else {
    return true;
  }
}

//2. 인증번호 눌렀을 때
let phConfrim = false;
let random = "";
let originPh = JSON.parse(sessionStorage.getItem("loginUser")).phone;
function phCheck() {
  const phLeng = phLength();
  const updatePh = newPh();
  const userPh = comparePh();
  //1) 번호형식 확인
  if (phLeng) {
    //2) 로그인했던 폰 번호랑 일치하지 않는지 확인
    if (updatePh) {
      if (userPh) {
        let ranNo = randomNo();
        console.log(ranNo);
        // const coolsms = require("coolsms-node-sdk").default;
        // const messageService = new coolsms(
        //   "개인키",
        //   "시크릿키"
        // );
        // messageService
        //   .sendOne({
        //     to: `${ph.value}`,
        //     from: "01063640525",
        //     text: `인증번호는 ${ranNo} 입니다.`,
        //   })
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => console.error(err));
        phConfrim = true;
        random = ranNo;
        originPh = ph.value;
        return ranNo;
      }
    }
  }
}

//인증번호 확인
let cerConfrim = false;
function cerCheck() {
  const res = newPh();
  if (random == "") {
    if (res) {
      alert("인증번호 버튼을 눌러주세요.");
    }
  }
  if (random != "" && random != phC.value) {
    alert("인증번호가 일치하지 않습니다.");
    cerConfrim = false;
  } else if (random != "" && random == phC.value) {
    alert("인증번호가 일치합니다.");
    cerConfrim = true;
  }
}

// 성별 체크된 값 받는 함수
const gender = document.querySelectorAll("[name='gender']");
function genderCehck() {
  for (item of gender) {
    if (item.checked) {
      return item.value;
    }
  }
}

//로그인한 유저의 로컬 스토리지 키값 확인
let keyNo = 0;
function keyCheck() {
  for (let key = 0; key < localStorage.length; key++) {
    const storeDate = JSON.parse(localStorage.getItem(key));
    if (storeDate && storeDate.id == loginUser.id) {
      keyNo = key;
      return keyNo;
    }
  }
}

//수정 버튼 눌렀을 때
//1. 비밀번호 확인
//2. 입력된 번호랑 일치하는지 확인 다른 경우 인증번호 체크
function phChange() {
  if (loginUser.phone != ph.value || phC.value != "") {
    if (!phConfrim) {
      alert("인증번호 버튼을 눌러주세요");
      return false;
    }
    if (!cerConfrim) {
      alert("인증번호 확인 버튼을 눌러주세요.");
      return false;
    }
  }
  return true;
}

const editInfor = document.getElementById("editBtn");
editInfor.addEventListener("click", () => {
  const newPw = checkPw();
  const phCh = phChange();
  //전화번호가 바뀐 경우 인증버튼을 눌러야 진행
  if (
    email.value == loginUser.email &&
    ph.value == loginUser.phone &&
    loginName.value == loginUser.name &&
    birth.value == loginUser.birth &&
    genderCehck() == loginUser.gender &&
    !pw.value &&
    !pw.value &&
    !phC.value
  ) {
    alert("수정사항이 없습니다.");
  } else {
    if (phCh) {
      if (newPw) {
        keyNo = keyCheck();
        user = {
          id: loginUser.id,
          pw: originPw,
          name: loginName.value,
          gender: genderCehck(),
          birth: birth.value,
          phone: originPh,
          email: email.value,
          delete: "0",
          login: "1",
          profile: newProfile,
        };
        console.log(user);
        localStorage.setItem(keyNo, JSON.stringify(user));
        sessionStorage.setItem("loginUser", JSON.stringify(user));
        alert("수정완료");
        window.location.href = "/mypage/회원정보수정및조회/회원정보메인.html";
        return;
      }
    }
  }
});

// function edit() {
//   const newPw = checkPw();
//   const phCh = phChange();
//   //전화번호가 바뀐 경우 인증버튼을 눌러야 진행
//   if (phCh) {
//     if (newPw) {
//       keyNo = keyCheck();
//       user = {
//         id: loginUser.id,
//         pw: originPw,
//         name: loginName.value,
//         gender: genderCehck(),
//         birth: birth.value,
//         phone: originPh,
//         email: email.value,
//         delete: "0",
//         login: "1",
//         profile: newProfile,
//       };
//       console.log(user);
//       localStorage.setItem(keyNo, JSON.stringify(user));
//       sessionStorage.setItem("loginUser", JSON.stringify(user));
//       alert("수정완료");
//       return;
//     }
//   }
// }

//취소버튼 누르면 다시 마이페이지로 이동
function cancel() {
  window.location.href = "/mypage/회원정보수정및조회/회원정보메인.html";
}

// //로그인 로그아웃 글자 변경
// const loginLink = document.getElementById("login");
// document.addEventListener("DOMContentLoaded", function () {
//   const Login = JSON.parse(sessionStorage.getItem("loginUser"));
//   //만약 로그인된 유저(세션로컬리지)에 데이터가 없는경우
//   console.log("로그인상태", login);
//   if (!Login) {
//     //비로그인상태
//     loginLink.innerText = "로그인";
//     linkMove();
//   } else {
//     //로그인상태
//     linkMove();
//     loginLink.innerText = "로그아웃";
//   }
// });

// //글자를 확인하고 그에 맞는 링크로 이동하기
// function linkMove() {
//   const linkText = loginLink.textContent; //a 태그에 있는 내용
//   if (linkText == "로그인") {
//     loginLink.href = "/login/2.로그인/로그인.html";
//   } else {
//     //메인페이지링크 넣기
//     loginLink.href = "/mypage/메인페이지/메인.html";
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  ////////////////////////////////// 로그인 관련 ////////////////////////////////////

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();
  let keyNo = 0;
  function keyCheck() {
    for (let key = 0; key < localStorage.length; key++) {
      const storeDate = JSON.parse(localStorage.getItem(key));
      if (storeDate && storeDate.id == userData.id) {
        keyNo = key;
        return keyNo;
      }
    }
  }

  if (userData && userData.login) {
    keyNo = keyCheck();
    const user = JSON.parse(localStorage.getItem(keyNo));
    if (userData.login == "1" && user.delete == "0") {
      // 로그인 상태일 때
      loginLink.innerText = "로그아웃";
      loginLink.href = "#";
      loginLink.addEventListener("click", () => {
        // 로그아웃 처리
        userData.login = "0";
        saveUserData(userData);
        logoutUser(userData);
        sessionStorage.removeItem("loginUser");
        // localStorage.setItem(`loginUser`, JSON.stringify(userData));
        location.reload(); // 페이지 새로고침
      });

      signupLink.innerText = "마이페이지";
      signupLink.href = "/mypage/회원정보수정및조회/회원정보메인.html";
    } else {
      // 로그아웃 상태일 때
      loginLink.innerText = "로그인";
      loginLink.href = "/login/2.로그인/로그인.html";

      signupLink.innerText = "회원가입";
      signupLink.href = "/login/1.회원가입/회원가입.html";
    }
  } else {
    loginLink.innerText = "로그인";
    loginLink.href = "/login/2.로그인/로그인.html";

    signupLink.innerText = "회원가입";
    signupLink.href = "/login/1.회원가입/회원가입.html";
  }
});

function getUserData() {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key == "loginUser") {
      const userData = JSON.parse(sessionStorage.getItem(key));
      if (userData) {
        return userData;
      }
    } else {
      continue;
    }
  }
  return null; // 사용자 데이터가 없거나 null인 경우
}

function saveUserData(userData) {
  sessionStorage.setItem(`loginUser`, JSON.stringify(userData));
}

// 로그아웃 클릭시 session에서 0으로 바뀐것을 local로 전달
function logoutUser(userData) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // localstorage 에 담긴 값.
    const localStorageData = localStorage.getItem(key);
    if (localStorageData) {
      try {
        // JSON문자열을 객체로 변환
        const localStorageObject = JSON.parse(localStorageData);
        // localStorage 객체와 session객체 비교.
        if (localStorageObject.id == userData.id) {
          // usreData의 login 값을 local에 업데이트
          localStorageObject.login = userData.login;

          // localStorageObject를 JSON문자열로 변환
          const updateLocalStorage = JSON.stringify(localStorageObject);

          localStorage.setItem(key, updateLocalStorage);
          break;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("if문 통과 못함");
    }
  }
}
