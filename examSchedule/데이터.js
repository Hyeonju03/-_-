//-------------------------------------------------------------데이터 저장
const examData = {
  1: {
    시험일: "2024-08-10",
    과목: "데이터분석전문가(ADP)",
    접수: "2024-07-01",
    수험표: "2024-07-26",
    결과: "2024-09-06",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  2: {
    시험일: "2024-08-10",
    과목: "데이터분석준전문가(ADsP)",
    접수: "2024-07-01",
    수험표: "2024-07-26",
    결과: "2024-09-06",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  3: {
    시험일: "2024-08-24",
    과목: "SQL전문가(SQLP)",
    접수: "2024-07-26",
    수험표: "2024-08-09",
    결과: "2024-09-20",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  4: {
    시험일: "2024-08-24",
    과목: "SQL개발자(SQLD)",
    접수: "2024-07-26",
    수험표: "2024-08-09",
    결과: "2024-09-20",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  5: {
    시험일: "2024-08-25",
    과목: "네트워크관리사2급",
    접수: "2024-07-23",
    수험표: "2024-07-23",
    결과: "2024-08-27",
    링크: "https://www.icqa.or.kr/cn/",
  },
  6: {
    시험일: "2024-09-07",
    과목: "빅데이터분석기사",
    접수: "2024-08-05",
    수험표: "2024-08-23",
    결과: "2024-09-27",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  7: {
    시험일: "2024-09-08",
    과목: "웹디자인기능사",
    접수: "2024-08-20",
    수험표: "2024-08-20",
    결과: "2024-09-25",
    링크: "https://www.q-net.or.kr/man001.do?imYn=Y&gSite=Q",
  },
  8: {
    시험일: "2024-09-08",
    과목: "제품응용모델링기능사",
    접수: "2024-08-20",
    수험표: "2024-08-20",
    결과: "2024-09-25",
    링크: "https://www.q-net.or.kr/man001.do?imYn=Y&gSite=Q",
  },
  9: {
    시험일: "2024-09-08",
    과목: "전자계산기기능사",
    접수: "2024-08-20",
    수험표: "2024-08-20",
    결과: "2024-09-25",
    링크: "https://www.q-net.or.kr/man001.do?imYn=Y&gSite=Q",
  },
  10: {
    시험일: "2024-09-08",
    과목: "정보기기운용기능사",
    접수: "2024-08-20",
    수험표: "2024-08-20",
    결과: "2024-09-25",
    링크: "https://www.q-net.or.kr/man001.do?imYn=Y&gSite=Q",
  },
  11: {
    시험일: "2024-09-23",
    과목: "전파전자통신기사",
    접수: "2024-09-09",
    수험표: "2024-09-09",
    결과: "2024-10-25",
    링크: "https://www.cq.or.kr/qh_quagm01_001.do",
  },
  12: {
    시험일: "2024-09-23",
    과목: "무선설비기사",
    접수: "2024-09-09",
    수험표: "2024-09-09",
    결과: "2024-10-25",
    링크: "https://www.cq.or.kr/qh_quagm01_001.do",
  },
  13: {
    시험일: "2024-09-23",
    과목: "정보통신기사",
    접수: "2024-09-09",
    수험표: "2024-09-09",
    결과: "2024-10-25",
    링크: "https://www.cq.or.kr/qh_quagm01_001.do",
  },
  14: {
    시험일: "2024-09-23",
    과목: "정보보안기사",
    접수: "2024-09-09",
    수험표: "2024-09-09",
    결과: "2024-10-25",
    링크: "https://www.cq.or.kr/qh_quagm01_001.do",
  },
  15: {
    시험일: "2024-09-28",
    과목: "데이터아키텍처전문가(DAP)",
    접수: "2024-08-26",
    수험표: "2024-09-13",
    결과: "2024-10-25",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  16: {
    시험일: "2024-09-28",
    과목: "데이터아키텍처준전문가(DAsP)",
    접수: "2024-08-26",
    수험표: "2024-09-13",
    결과: "2024-10-25",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  17: {
    시험일: "2024-10-12",
    과목: "데이터분석전문가(ADP)",
    접수: "2024-09-09",
    수험표: "2024-09-27",
    결과: "2024-11-08",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  18: {
    시험일: "2024-10-19",
    과목: "정보처리기사",
    접수: "2024-09-10",
    수험표: "2024-09-10",
    결과: "2024-11-20",
    링크: "https://www.q-net.or.kr/man001.do?imYn=Y&gSite=Q",
  },
  19: {
    시험일: "2024-10-19",
    과목: "임베디드기사",
    접수: "2024-09-10",
    수험표: "2024-09-10",
    결과: "2024-11-20",
    링크: "https://www.q-net.or.kr/man001.do?imYn=Y&gSite=Q",
  },
  20: {
    시험일: "2024-10-19",
    과목: "전자계산기조직응용기사",
    접수: "2024-09-10",
    수험표: "2024-09-10",
    결과: "2024-11-20",
    링크: "https://www.q-net.or.kr/man001.do?imYn=Y&gSite=Q",
  },
  21: {
    시험일: "2024-10-27",
    과목: "네트워크관리사1급",
    접수: "2024-09-24",
    수험표: "2024-09-24",
    결과: "2024-10-29",
    링크: "https://www.icqa.or.kr/cn/",
  },
  22: {
    시험일: "2024-11-03",
    과목: "데이터분석준전문가(ADsP)",
    접수: "2024-09-30",
    수험표: "2024-10-18",
    결과: "2024-11-29",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  23: {
    시험일: "2024-11-03",
    과목: "네트워크관리사2급",
    접수: "2024-10-08",
    수험표: "2024-10-08",
    결과: "2024-11-05",
    링크: "https://www.icqa.or.kr/cn/",
  },
  24: {
    시험일: "2024-11-17",
    과목: "SQL 개발자(SQLD)",
    접수: "2024-10-14",
    수험표: "2024-11-01",
    결과: "2024-12-13",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
  25: {
    시험일: "2024-11-30",
    과목: "빅데이터분석기사",
    접수: "2024-10-28",
    수험표: "2024-11-15",
    결과: "2024-12-20",
    링크: "https://www.dataq.or.kr/www/main.do",
  },
};
localStorage.setItem("examData", JSON.stringify(examData));

//------------------------------------------------------------- Date를 오늘날짜로 설정해주는 JS

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // 월과 일이 한 자리 숫자일 경우 두 자리로 맞추기
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}

// 오늘 날짜를 가져와서 startDate와 endDate의 min 속성으로 설정
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

startDateInput.min = getTodayDateString();
endDateInput.min = getTodayDateString();

//---------------------------------------------------------------------------- 시험일정 출력해주는 JS

// localStorage에서 시험 데이터 가져오기
const storedExamData = JSON.parse(localStorage.getItem("examData"));

// 테이블의 tbody 요소 참조
const tableBody = document.querySelector("#examTable tbody");

// 검색 버튼 클릭 시 호출되는 함수
function searchExams() {
  const selectedType = document.getElementById("typeCertificate").value;
  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;

  const startDate = startDateInput ? new Date(startDateInput) : null;
  const endDate = endDateInput ? new Date(endDateInput) : null;

  // 테이블 초기화
  tableBody.innerHTML = "";

  // storedExamData를 순회하며 조건에 맞는 시험 일정을 테이블에 추가
  Object.keys(storedExamData).forEach((key) => {
    const exam = storedExamData[key];
    const examDate = new Date(exam.시험일);

    // 필터링 조건
    const isTypeMatch = selectedType === "-" || exam.과목 === selectedType;
    const isDateMatch =
      startDate === null ||
      endDate === null ||
      (examDate >= startDate && examDate <= endDate);

    if (isTypeMatch && isDateMatch) {
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
  });

  // 결과가 없는 경우 메시지 표시
  if (tableBody.innerHTML === "") {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5">해당 조건에 맞는 시험 일정이 없습니다.</td>`;
    tableBody.appendChild(row);
  }
}
