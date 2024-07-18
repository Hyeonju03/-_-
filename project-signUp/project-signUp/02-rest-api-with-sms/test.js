const coolsms = require("coolsms-node-sdk").default;

// apiKey, apiSecret 설정
const messageService = new coolsms(
  "NCS9L2EWZZQKBULJ",
  "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
);

// 2건 이상의 메시지를 발송할 때는 sendMany, 단일 건 메시지 발송은 sendOne을 이용해야 합니다.
messageService
  .sendOne([
    {
      to: "01063640525",
      from: "01012345678",
      text: "한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 발송됩니다.",
    },
    // 1만건까지 추가 가능
  ])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
