function sendSms(phone, random) {
  const coolsms = require("coolsms-node-sdk").default;
  const messageService = new coolsms(
    "NCS9L2EWZZQKBULJ",
    "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
  );
  messageService
    .sendOne({
      to: phone,
      from: "01063640525",
      text: `인증번호: ${random}`,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
}

function random() {
  const random = Math.floor(Math.random() * 100000);
  if (random < 10000) {
    return random * 10;
  }
  console.log(random);
}
