const user = {
  id: "",
  pw: "",
  name: "",
  gender: "",
  phone: "",
  email: "",
  delete: "0",
};
let userNo = 0;
const signId = document.getElementById("signUp_id"); //입력받는 아이디
const signPw = document.getElementById("signUp_pw"); //입력받는 비밀번호
const pwCheck = document.getElementById("signUp_pw_check"); // 입력받는 비밀번호 확인
const signName = document.getElementById("signUp_name"); // 입력받는 이름
const signPh = document.getElementById("signUp_phoneNo"); // 입력받는 전화번호
const certiPh = document.getElementById("certiNo"); // 입력받는 인증번호
const signEmail = document.getElementById("signUp_email"); //입력받는 이메일
const signGender = document.querySelectorAll("[name='gender']"); //성별

// 이부분 폼의 라디오박스 부분 확인하기

//아이디 확인 함수
signId.addEventListener("blur", function (e) {
  alert("아이디 확인 버튼을 누르세요");
});

function idCheck() {
  const newId = signId.value;
  for (let i = 0; i < userNo; i++) {
    if (user.id == newId) {
      alert("이미 존재하는 아이디입니다.");
      idConfrim = false;
      return;
    }
  }
  user.id = newId;
  localStorage.setItem(userNo, JSON.stringify(user));
  userNo++;
  idConfrim = true;
  alert("사용 가능한 아이디입니다.");
}

//비밀번호 확인 함수
signPw.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}|:"<>?/`~.-]/g, ""); //비밀번호 조건
});

pwCheck.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}|:"<>?/`~.-]/g, "");
});

let pwConfirm = false; //비밀번호 확인여부
pwCheck.addEventListener("blur", function (e) {
  const pw = signPw.value;
  const pCheck = pwCheck.value;
  if (pw === pCheck) {
    user.pw = pw;
    localStorage.setItem(userNo, JSON.stringify(user));
    pwConfirm = true;
  } else {
    alert("비밀번호가 일치하지 않습니다.");
    e.preventDefault();
    pwConfirm = false;
  }
});

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
  if (name.length < 2 || name.length > 5) {
    console.log(name.length);
    alert("이름은 2~5글자까지 입력가능합니다.");
    e.preventDefault();
  }
  user.name = name;
  localStorage.setItem(userNo, JSON.stringify(user));
});

// //성별체크 값 받는 함수
function genderCehck() {
  for (item of signGender) {
    if (item.checked) {
      return item.value;
    }
  }
}

//전화번호 입력함수
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
  this.value = result; // 결과 문자열을 다시 입력 요소에 설정
});

//전화번호 형식(3,4,3) 맞는지 확인
signPh.addEventListener("blur", function () {
  const expHp = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰 번호 형식 정규 표현식
  if (!expHp.test(signPh.value)) {
    alert(
      "휴대폰 번호 형식을 확인하세요. (예: 010-1234-5678, 10자리 또는 11자리)"
    );
    return false;
  }
  user.phone = signPh.value;
  localStorage.setItem(userNo, JSON.stringify(user));
});

//인증번호 생성
let random = "";
function randomNo() {
  for (i = 0; i < 5; i++) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
}

//전화번호 형식이 맞을때 인증번호 발송
function sendSms() {
  if (signPh.value != false) {
    random = randomNo();
    console.log(random);
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
  } else {
    alert("전화번호를 확인해주세요.");
  }
}

//인증번호 일치여부
let phConfrim = false;
function phCheck() {
  if (random != certiPh.value) {
    alert("인증번호가 일치하지 않습니다.");
    phConfrim = false;
  } else {
    alert("인증번호가 일치합니다.");
    console.log(certiPh.value);
    phConfrim = true;
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
  user.email = signEmail.value;
  localStorage.setItem(userNo, JSON.stringify(user));
});

//유효성검사
const wId = document.getElementById("warnId");
const wPw = document.getElementById("warnPw");
const wName = document.getElementById("warnName");
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
    user.gender = genderCehck();
    localStorage.setItem(userNo, JSON.stringify(user));
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

function goSign() {
  const res = valCheck();
  //빠진 부분이 없을경우 비밀번호, 인증번호 확인
  if (res) {
    if (!pwConfirm) {
      alert("비밀번호를 확인하세요");
      return;
    }
    if (!phConfrim) {
      alert("인증번호를 확인하세요");
      return;
    }
    user = {
      id: signId.value,
      pw: signPw.value,
      name: signName.value,
      phone: signPh.value,
      email: signEmail.value,
      delete: "0",
      login: "0",
    };
    localStorage.setItem(userNo, JSON.stringify(user));
    alert("회원가입완료");
  }
}
