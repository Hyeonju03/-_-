let user = {
  id: "",
  pw: "",
  name: "",
  gender: "",
  birth: "",
  phone: "",
  email: "",
  delete: "0",
  login: "0",
  profile: "0",
};

const signId = document.getElementById("signUp_id"); //입력받는 아이디
const signPw = document.getElementById("signUp_pw"); //입력받는 비밀번호
const pwCheck = document.getElementById("signUp_pw_check"); // 입력받는 비밀번호 확인
const signName = document.getElementById("signUp_name"); // 입력받는 이름
const signBirth = document.getElementById("userBirth"); // 입력받는 생년월일
const signPh = document.getElementById("signUp_phoneNo"); // 입력받는 전화번호
const certiPh = document.getElementById("certiNo"); // 입력받는 인증번호
const signEmail = document.getElementById("signUp_email"); //입력받는 이메일
const signGender = document.querySelectorAll("[name='gender']"); //성별

// 이부분 폼의 라디오박스 부분 확인하기

//아이디 확인 함수

let idConfrim = false;
function idCheck() {
  const newId = signId.value; //입력받은 아이디

  for (let i = 0; i < localStorage.length; i++) {
    //로컬스토리지 돌면서 비교
    const userId = JSON.parse(localStorage.getItem(i)).id; // 키가 0인거부터 순서대로 id를 담음
    if (userId == false) {
      alert("첫번쨰회원");
      return true;
    }
    if (userId == newId) {
      alert("이미 존재하는 아이디입니다.");
      idConfrim = false;
      return;
    }
  }
  console.log("함수 진행되긴하는지");
  alert("사용 가능한 아이디입니다.");
  idConfrim = true;
}

//비밀번호 확인 함수
signPw.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}|:"<>?/`~.-]/g, ""); //비밀번호 조건
});

pwCheck.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}|:"<>?/`~.-]/g, "");
});

let pwConfirm = false; //비밀번호 확인여부
function rePw() {
  const pw = signPw.value;
  const pCheck = pwCheck.value;
  if (pw == pCheck) {
    alert("비밀번호가 일치합니다.");
    pwConfirm = true;
    return;
  } else {
    alert("비밀번호가 일치하지 않습니다.");
    // e.preventDefault();
    pwConfirm = false;
  }
}

let count = 1;
function pwEye() {
  if (count % 2 != 0) {
    signPw.type = "text";
  } else {
    signPw.type = "password";
  }
  count++;
}

//이름 입력(한글만 입력하게 해뒀음)
signName.addEventListener("input", function () {
  this.value = this.value.replace(/[^가-힣]/g, "");
});

signName.addEventListener("blur", function (e) {
  let name = this.value;
  if (name.length < 2 || name.length > 4) {
    alert("이름은 2~5글자까지 입력가능합니다.");
    // e.preventDefault();
    return;
  }
  // user.name = name;
  // localStorage.setItem(userNo, JSON.stringify(user));
});

// //성별체크 값 받는 함수
function genderCehck() {
  for (item of signGender) {
    if (item.checked) {
      return item.value;
    }
  }
}

//생년월일
signBirth.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
  if (this.value.length > 6) {
    alert("생년월일은 6자리 숫자로 입력해야 합니다.");
  }
});

//전화번호 입력함수
let phNo = "";
signPh.addEventListener("input", function () {
  const inputValue = this.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
  let result = ""; //화면에 보이는 숫자(하이픈 포함)
  let index = 0;

  for (let i = 0; i < inputValue.length; i++) {
    if (index === 3 || index === inputValue.length - 4) {
      result += "-"; // 3번째와 마지막 4자리 앞에 하이픈 추가
    }
    result += inputValue[i];
    index++;
  }
  phNo = result.replaceAll("-", "");
  this.value = result; // 하이픈 입력한 값을 value로 설정
  return phNo;
});

//전화번호 형식(3,4,3) 맞는지 확인
function checkPh() {
  const expHp = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰 번호 형식 정규 표현식
  if (!expHp.test(signPh.value)) {
    alert(
      "휴대폰 번호 형식을 확인하세요. (예: 010-1234-5678, 10자리 또는 11자리)"
    );
    return false;
  }
  return true;
}

//전화번호 중복 제거

function phDup() {
  const ph = signPh.value; //입력받은 전화번호
  let checkPh = []; //비교할 로컬 번호
  for (let i = 0; i < localStorage.length; i++) {
    checkPh.push(JSON.parse(localStorage.getItem(i)).phone); // 키가 0인거부터 순서대로 전화번호를 담음
  }
  if (checkPh.includes(ph)) {
    alert("이미 사용중인 전화번호 입니다.");
    return false;
  }
  return true;
}

//인증번호 생성
function randomNo() {
  let random = "";
  while (random.length < 5) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
}

//전화번호 형식이 맞을때 인증번호 발송
let phConfrim = false;
let random = "";
function sendSms() {
  //1.숫자 형식 확인
  const ph = checkPh();
  if (ph) {
    //2.전화중복확인
    const dupli = phDup();
    if (signPh.value && dupli) {
      let ranNo = randomNo();
      console.log(ranNo);
      //   const coolsms = require("coolsms-node-sdk").default;
      // const messageService = new coolsms(
      //   "NCS9L2EWZZQKBULJ",
      //   "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
      // );

      // messageService
      //   .sendOne({
      //     to: "01063640525",
      //     from: "01063640525",
      //     text: "SM 수 있습니다.",
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => console.error(err));
      phConfrim = true;
      random = ranNo;
      return ranNo;
    }
  }
}

//인증번호 일치여부
let cerConfrim = false;
function phCheck() {
  if (random != certiPh.value) {
    alert("인증번호가 일치하지 않습니다.");
    cerConfrim = false;
  } else {
    alert("인증번호가 일치합니다.");
    cerConfrim = true;
  }
}

//이메일 입력
signEmail.addEventListener("input", function () {
  const inputValue = this.value.replace(/[^A-Za-z0-9\-@._]+/g, "");
  this.value = inputValue; //
});

//이메일 검증
// "문제 kr만 안 걸림"
signEmail.addEventListener("blur", function () {
  const expEmail = /^[A-Za-z-0-9\-\.]+@[A-Ja-z-0-9\-\.]+\.[com||net||kr]+$/; // 이메일양식확인
  if (!expEmail.test(signEmail.value)) {
    alert(
      "이메일 형식을 확인하세요. @와 .com, net, kr을 포함해야 합니다. \n(예: abcd@naver.com)"
    );
    return false;
  }
  // user.email = signEmail.value;
  // localStorage.setItem(userNo, JSON.stringify(user));
});

//유효성검사
const wId = document.getElementById("warnId");
const wPw = document.getElementById("warnPw");
const wName = document.getElementById("warnName");
const wBir = document.getElementById("warnBirth");
const wGen = document.getElementById("warnGend");
const wCer = document.getElementById("warnCer");
const wPh = document.getElementById("warnPh");
const wEm = document.getElementById("warnEmail");

function valCheck() {
  if (!signId.value) {
    wId.classList.remove("hidden");
    return false;
  } else {
    wId.classList.add("hidden");
  }

  if (!signPw.value) {
    wPw.classList.remove("hidden");
    return false;
  } else {
    wPw.classList.add("hidden");
  }
  if (!signName.value) {
    wName.classList.remove("hidden");
    return false;
  } else {
    wName.classList.add("hidden");
  }
  const res = genderCehck();
  if (!res) {
    wGen.classList.remove("hidden");
    return false;
  } else {
    wGen.classList.add("hidden");
  }
  if (!signBirth.value) {
    wBir.classList.remove("hidden");
    return false;
  } else {
    wBir.classList.add("hidden");
  }
  if (!signPh.value) {
    wPh.classList.remove("hidden");
    return false;
  } else {
    wPh.classList.add("hidden");
  }

  if (!certiPh.value) {
    wCer.classList.remove("hidden");
    return false;
  } else {
    wCer.classList.add("hidden");
  }

  if (!signEmail.value) {
    wEm.classList.remove("hidden");
    return false;
  } else {
    wEm.classList.add("hidden");
  }
  return true;
}

//회원가입 완료 전, 키값 설정
// function findMaxKey() {
//   // 모든 키값을 순회한다.
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     // 숫자 키만 확인한다.
//     if (!isNaN(key)) {
//       // 키값을 숫자로 변환한다.
//       const keyNum = parseInt(key);

//       // 최대 키값을 저장하는 변수를 초기화하거나 갱신한다.
//       if (userNo === undefined || keyNum > userNo) {
//         userNo = keyNum;
//       }
//     }
//   }
//   // 최대 키값을 반환한다.
//   return userNo;
// }

// const maxKey = findMaxKey();

let no = 0;
localStorage.setItem("no", no);
const keyNo = JSON.parse(sessionStorage.getItem("no"));

function goSign() {
  const res = valCheck();
  //빠진 부분이 없을경우 비밀번호, 인증번호 확인
  if (res) {
    if (signBirth.value.length != 6) {
      alert("6자리 숫자를 입력해주세요.");
      return;
    }
    if (!idConfrim) {
      alert("아이디 확인 버튼을 누르세요.");
      return;
    }
    if (!pwConfirm) {
      alert("비밀번호를 확인 버튼을 누르세요");
      return;
    }
    if (!phConfrim) {
      alert("인증번호받기 버튼을 누르세요.");
      return;
    }
    if (!cerConfrim) {
      alert("인증번호확인 버튼을 누르세요.");
      return;
    }
    user = {
      id: signId.value,
      pw: signPw.value,
      name: signName.value,
      gender: genderCehck(),
      birth: signBirth.value,
      phone: signPh.value,
      email: signEmail.value,
      delete: "0",
      login: "0",
      profile: "0",
    };
    console.log(keyNo);
    localStorage.setItem(keyNo, JSON.stringify(user));
    alert("회원가입완료");
    no++;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// let logintext = document.getElementById("login");
// let mypagetext = document.getElementById("mypage");
// for (let i = 0; i < localStorage.length; i++) {
//   const loginState = JSON.parse(localStorage.getItem(i));
//   if (JSON.parse(localStorage.getItem(i)).login) {
//     logintext.innerText = "로그아웃";
//     mypagetext.innerText = "마이페이지";

//     logintext.addEventListener("click", () => {
//       loginState.login = "0";
//       localStorage.setItem(i, JSON.stringify(loginState));

//       logintext.innerText = "로그인";
//       mypagetext.innerText = "회원가입";

//       // logintext.addEventListener("click", () => {
//       //   logintext.href = "/login/2.로그인/로그인.html";
//       // });
//     });
//     mypagetext.addEventListener("click", () => {
//       mypagetext.href = "#";
//     });
//   }
// }

let logintext = document.getElementById("login");
let mypagetext = document.getElementById("mypage");
console.log(logintext);
for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(i)).login == false) {
    alert("유저없음");
  }
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
