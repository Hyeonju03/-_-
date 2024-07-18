const CoolsmsMessageService = require("coolsms-node-sdk");
const messageService = new CoolsmsMessageService(
  "NCS9L2EWZZQKBULJ",
  "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
);

messageService.send({
  to: "010636450525",
  from: "계정에서 등록한 발신번호 입력",
  text: "SMS는 한글 45자, 영자 90자까지 입력할 수 있습니다.",
});

// import coolsms from "coolsms-node-sdk";
// export const sendTokenToSMS = async (phone, token) => {
//   const SMS_KEY = "본인의 Coolsms API Key";
//   const SMS_SECRET = "본인의 Coolsms API Secret";
//   const SMS_SENDER = "발신번호로 등록했던 본인의 휴대폰 번호";

//   const mySms = coolsms.default; // SDK 가져오기
//   const messageService = new mySms(SMS_KEY, SMS_SECRET);
//   const result = await messageService.sendOne({
//     to: phone,
//     from: SMS_SENDER,
//     text: `안녕하세요! 요청하신 인증번호는 ${token}입니다.`,
//   });
//   console.log(phone + "번호로 인증번호" + token + "을 전송합니다.");

//   return result;
// };
// sendTokenToSMS("01063640525", "1234");
