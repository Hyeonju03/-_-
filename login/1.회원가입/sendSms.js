// const coolsms = require("coolsms-node-sdk").default;
// export async function sendTokenToSmS(phone, ranNo) {
//   const sms_key = "NCS9L2EWZZQKBULJ";
//   const sms_secret = "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B";
//   const sms_sender = "01063640525";

//   const mySms = coolsms.default;
//   const messageService = new mySms(sms_key, sms_secret);
//   const result = await messageService.sendOne({
//     to: phone,
//     from: sms_sender,
//     text: `안녕하세요 인증번호는 ${ranNo} 입니다.`,
//   });
//   console.log(phone + `번호로 인증번호` + ranNo + `을 전송합니다.`);
// }
const coolsms = require("./login/node_modules/coolsms-node-sdk").default;
function smsTest(phone, random) {
  // import * as coolsms from "coolsms-node-sdk";
  // import coolsms from "coolsms-node-sdk";
  const messageService = new coolsms(
    "NCS9L2EWZZQKBULJ",
    "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
  );
  messageService
    .sendOne({
      to: `${signPh.value}`,
      from: "01063640525",
      text: `인증번호는 ${ranNo}입니다. `,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
}
