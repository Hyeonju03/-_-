const nonClick = document.querySelectorAll(".tapHead");
const id = document.getElementById("articleId");
const pw = document.getElementById("articlePw");

function handleClick(event) {
  // div에서 모든 "click" 클래스 제거
  nonClick.forEach((e) => {
    e.classList.remove("click");
  });
  // 클릭한 div만 "click"클래스 추가
  event.target.classList.add("click");
}
nonClick.forEach((e) => {
  e.addEventListener("click", handleClick);
});
