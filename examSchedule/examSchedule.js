document.addEventListener("DOMContentLoaded", function () {
  const clickTop = document.querySelector(".gotoTop");
  clickTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ///////////////////////////////////////////////////

  // localStorage에서 시험 데이터 가져오기
  const examData = JSON.parse(localStorage.getItem("examData"));

  // 테이블의 tbody 요소 참조
  const tableBody = document.querySelector("#examTable tbody");

  // 검색 버튼 클릭 시 호출되는 함수
  function searchExams() {
    const selectedType = document.getElementById("typeCertificate").value;
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    // 테이블 초기화
    tableBody.innerHTML = "";

    // examData를 순회하며 조건에 맞는 시험 일정을 테이블에 추가
    for (let key in examData) {
      if (examData.hasOwnProperty(key)) {
        const exam = examData[key];
        const examDate = new Date(exam.시험일);

        // 선택한 종목이나 시작일/종료일 범위에 맞는 데이터만 테이블에 추가
        if (
          (selectedType === "-" || exam.과목 === selectedType) &&
          examDate >= startDate &&
          examDate <= endDate
        ) {
          const row = document.createElement("tr");
          row.innerHTML = `
        <td>${exam.시험일}</td>
        <td><a href="${exam.링크}" target="_blank">${exam.과목}</a></td>
        <td>${exam.접수}</td>
        <td>${exam.수험표}</td>
        <td>${exam.결과}</td>
      `;
          tableBody.appendChild(row);
        }
      }
    }

    // 결과가 없는 경우 메시지 표시
    if (tableBody.innerHTML === "") {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="5">해당 기간과 종목에 맞는 시험 일정이 없습니다.</td>`;
      tableBody.appendChild(row);
    }
  }

  ////////////////////////////////// 로그인 관련 ////////////////////////////////////

  //로그인 상태 여부
  const loginLink = document.getElementById("login");
  const signupLink = document.getElementById("mypage");

  let userData = getUserData();

  if (userData && userData.login) {
    if (userData.login == "1") {
      // 로그인 상태일 때
      loginLink.innerText = "로그아웃";
      loginLink.href = "#";
      loginLink.addEventListener("click", () => {
        // 로그아웃 처리
        userData.login = "0";
        saveUserData(userData);
        logoutUser(userData);

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
