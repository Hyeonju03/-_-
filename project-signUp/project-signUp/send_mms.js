/**
 * 사진 문자(MMS) 발송 예제
 * 발신번호, 수신번호에 반드시 -, * 등 특수문자를 제거하여 기입하시기 바랍니다. 예) 01012345678
 */
const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms(
  "NCS9L2EWZZQKBULJ",
  "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
);

// 단일 발송 예제
messageService
  .sendOne({
    to: "01080333117",
    from: "010-6364-0525",
    text: "ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ",
  })
  .then((res) => console.log(res));
