document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// 현재 로그인한 유저
const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

// 프로필 사진 변경
let newProfile = "0";
function cgProfile(e) {
  const files = e.currentTarget.files;
  const img = document.getElementById("profile");
  if (loginUser.profile == 0) {
    img.src = `/mypage/imgs/프로필기본.png`;
  } else {
    img.src = `/mypage/imgs/${loginUser.profile}`;
  }
  img.src = `/mypage/imgs/${files[0].name}`;
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
function checkPw() {
  if (!pw.value && !pwC.value) {
    console.log("공백이에요~");
    return false;
  }
  if (pw.value != pwC.value) {
    warnPwc.classList.remove("warn");
    return false;
  } else {
    warnPwc.classList.add("warn");
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
  let checkPh = []; // 로컬에 존재하는 전화번호를 담을 배열
  for (let i = 0; i < localStorage.length; i++) {
    checkPh.push(loginUser.phone); // 키가 0인거부터 순서대로 전화번호를 담음
  }
  if (checkPh.includes(newPh)) {
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
  }
  return true;
}

//2. 인증번호 눌렀을 때
let phConfrim = false;
let random = "";
function phCheck() {
  const phLeng = phLength();
  const userPh = comparePh();
  const newPh = newPh();
  //1) 번호형식 확인
  if (phLeng) {
    //2) 로그인했던 폰 번호랑 일치하지 않는지 확인
    if (newPh) {
    } else {
      //일치하지 않으면 로컬에서 중복체크 후 인증번호 전송(콜솔로그에 phNo 잘 뜨는지 확인해보기)
      if (userPh) {
        let ranNo = randomNo();
        console.log(ranNo);
        // const coolsms = require("coolsms-node-sdk").default;
        // const messageService = new coolsms(
        //   "NCS9L2EWZZQKBULJ",
        //   "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
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
        return ranNo;
      }
    }
  }
}

//인증번호 확인
let cerConfrim = false;
function cerCheck() {
  if (random != phC.value) {
    alert("인증번호가 일치하지 않습니다.");
    cerConfrim = false;
  } else {
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
function edit() {
  const newPw = checkPw();
  const newPh = newPh();

  if (newPw) {
    if (loginUser.phone != ph.value) {
      if (!phConfrim) {
        alert("인증번호 버튼을 눌러주세요");
        return;
      }
      if (!cerConfrim) {
        alert("인증번호 확인 버튼을 눌러주세요.");
        return;
      }
      user = {
        id: loginUser.id,
        pw: pw.value,
        name: loginName.value,
        gender: genderCehck(),
        birth: birth.value,
        phone: ph.value,
        email: email.value,
        delete: "0",
        login: "1",
        profile: newProfile,
      };
      console.log(user);
      localStorage.setItem(keyNo, JSON.stringify(user));
      sessionStorage.setItem("loginUser", JSON.stringify(user));
      alert("수정완료");
    }
  }
}

//취소버튼 누르면 다시 마이페이지로 이동
function cancel() {
  window.location.href = "/mypage/회원정보수정및조회/회원정보메인";
}
