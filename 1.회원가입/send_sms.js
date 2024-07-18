import coolsms from "coolsms-node-sdk";

export function sendSms() {
  const messageApiKey = "NCS9L2EWZZQKBULJ";
  const apiSecret = "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B";

  const sms = coolsms.default;
  const smsService = new sms(messageApiKey, apiSecret);

  smsService
    .sendOne({
      to: "01063640525",
      from: "SDC",
      text: `인증번호: ${random()}`,
    })
    .then((res) => console.log(res));
}

function random() {
  const random = Math.floor(Math.random() * 100000);
  if (random < 10000) {
    return random * 10;
  }
  console.log(random);
}
