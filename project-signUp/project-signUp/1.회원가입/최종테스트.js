const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms(
  "NCS9L2EWZZQKBULJ",
  "TVEIEYPKOYBZZN2ISBLHMJXUWSMJWZ0B"
);

messageService
  .sendOne({
    to: "01063640525",
    from: "01063640525",
    text: "SM 수 있습니다.",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));
