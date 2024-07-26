// 모달창을 띄우기 위한 함수들

document.addEventListener("DOMContentLoaded", function () {
  const modalBtn = document.getElementById("modalBtn");
  const modal = document.getElementById("q_Modal");
  const closeBt = document.getElementById("closebtn");

  function toggleModal() {
    modal.classList.toggle("show");
  }

  modalBtn.addEventListener("click", toggleModal);
  closeBt.addEventListener("click", toggleModal);

  window.addEventListener("click", function (evernt) {
    if (evernt.target === modal) {
      toggleModal();
    }
  });
});

//아이디 찾기를 위한 객체
const newName = document.getElementById("findId_name");
const newPh = document.getElementById("findId_ph");
const cerNo = document.getElementById("findId_certi");

//이름 입력시 로컬에 있는지 확인
function nameCheck() {
  const inputName = newName.value; //입력받은 이름
  let checkedName = []; // 비교할 이름목록
  for (let i = 0; i < localStorage.length; i++) {
    const storedItem = localStorage.getItem(i);
    if (storedItem === null) {
      console.log(`로컬 스토리지에서 ${i} 인덱스의 데이터가 null입니다.`);
      continue;
    }
    try {
      const userData = JSON.parse(storedItem);
      const userName = userData.name;

      if (userName) {
        // phone 필드가 유효한 경우에만 배열에 추가
        checkedName.push(userName);
      }
    } catch (error) {
      console.error(`로컬 스토리지 데이터 처리 중 오류 발생: ${error.message}`);
      // 예외 처리
    }
  }
  if (!checkedName.includes(inputName)) {
    alert("일치하는 이름이 없습니다.");
    return false;
  }
  return true;
}

//이름을 통해서 키값들 찾기 (동명이인인 경우를 대비하여 배열로 받음)
let keyObj = [];
function keyCheck() {
  for (let key = 0; key < localStorage.length; key++) {
    const storeDate = localStorage.getItem(key);
    if (storeDate === null) {
      console.log(`로컬 스토리지에서 ${key} 인덱스의 데이터가 null입니다.`);
      continue;
    }
    try {
      const userData = JSON.parse(storeDate);
      const userName = userData.name;
      if (userName == newName.value) {
        // phone 필드가 유효한 경우에만 배열에 추가
        keyObj.push(key);
      }
    } catch (error) {
      console.error(`로컬 스토리지 데이터 처리 중 오류 발생: ${error.message}`);
      // 예외 처리
    }
  }
  return keyObj;
}

//전화번호 하이픈 넣기
let phNo = ""; //문자전송을 위해 하이픈 제거
newPh.addEventListener("input", function () {
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

//이름이랑 번호가 일치하는지 확인
function namePhCheck() {
  const res = keyCheck();
  let inputPh = newPh.value;
  let checkPj = []; // 동명이인일 경우 해당 키의 전화번호를 전부 저장
  for (item of res) {
    checkPj.push(JSON.parse(localStorage.getItem(item)).phone);
  }
  if (checkPj.includes(inputPh)) {
    alert("전화번호가 일치합니다.");
    return true;
  } else {
    alert("전화번호가 일치하지 않습니다.");
    return false;
  }
}

//전화번호 길이 확인
function phLength() {
  const expHp = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰 번호 형식 정규 표현식
  if (!expHp.test(newPh.value)) {
    alert(
      "휴대폰 번호 형식을 확인하세요. (예: 010-1234-5678, 10자리 또는 11자리)"
    );
    return false;
  }
  return true;
}

//아이디와 전화번호가 일치하는 키 값을 찾아내기
let key = 0;
function findKey() {
  for (let i = 0; i < localStorage.length; i++) {
    const storeDate = JSON.parse(localStorage.getItem(i));
    if (storeDate && storeDate.phone == newPh.value) {
      keyNo = i;
      return keyNo;
    }
  }
}

//인증번호 생성
function randomNo() {
  let random = ""; //랜덤으로 생성되는 숫자
  while (random.length < 5) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
}

//인증번호 보내기
let random = ""; // 숫자고정해서 인증번호 확인하기 위한 변수
let phConfrim = false;
function sendSms() {
  const res = phLength();
  if (res) {
    const ph = namePhCheck();
    if (ph) {
      ran = randomNo();
      console.log(ran);
      //   const coolsms = require("coolsms-node-sdk").default;
      // const messageService = new coolsms(
      //   "NCS9L2EWZZQKBULJ",
      //   "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
      // );

      // messageService
      //   .sendOne({
      //     to: `${phNo}`,
      //     from: "01063640525",
      //     text: `인증번호는 ${ran}입니다.`,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => console.error(err));
      phConfrim = true;
      random = ran;
      return random;
    }
  }
}

//인증번호 일치 확인
let ceConfirm = false;
function cerCheck() {
  if (random != cerNo.value) {
    alert("인증번호가 일치하지 않습니다.");
    ceConfirm = false;
  } else {
    alert("인증번호가 일치합니다.");
    ceConfirm = true;
  }
}

//유효성 검사
const wName = document.getElementById("warnName");
const wPh = document.getElementById("warnPh");
const wCer = document.getElementById("warnCer");

function vaCheck() {
  if (!newName.value) {
    wName.classList.remove("hiddenSt");
    return false;
  } else {
    wName.classList.add("hiddenSt");
  }
  if (!newPh.value) {
    wPh.classList.remove("hiddenSt");
    return false;
  } else {
    wPh.classList.add("hiddenSt");
  }
  if (!cerNo.value) {
    wCer.classList.remove("hiddenSt");
    return false;
  } else {
    wCer.classList.add("hiddenSt");
  }
  return true;
}

//아이디 확인
function findId() {
  const val = vaCheck();
  if (val) {
    const name = nameCheck();
    if (name) {
      if (!phConfrim) {
        alert("인증번호받기 버튼을 눌러주세요.");
        return;
      }
      if (!ceConfirm) {
        alert("인증번호 확인 버튼을 눌러주세요.");
        return;
      }
      alert(
        `가입하신 아이디는 ${
          JSON.parse(localStorage.getItem(findKey())).id
        }입니다.`
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/*/////////
let logintext = document.getElementById("login");
let mypagetext = document.getElementById("mypage");
console.log(logintext);
for (let i = 0; i < localStorage.length; i++) {
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
  ///////////*/
