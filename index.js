exports.handler = (event, context, callback) => {
  const https = require("https");
  const url = "https://www.binance.com/info/getRegisterOpen.html";
  const TelegramBot = require("node-telegram-bot-api");
  const token = "<Telegram-Bot-Key>";
  const bot = new TelegramBot(token, { polling: false, filepath: false });
  const chatId = "<chat_id>";

  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log("Registration: " + body.registerOpen);
    var status = body.registerOpen;
    var responseStatus = "Registration: " + body.registerOpen;
    bot.getChat(chatId).then(function (chat) {
      if (status == "true") {
        console.log("Registration is Open");
        if (status == chat.description) {
          console.log("No Change");
        }
        else {
          bot.sendMessage(chatId, "Registration is OPEN!!");
          bot.sendMessage(chatId, "https://www.binance.com/register.html?ref=12692139");
          bot.setChatDescription(chatId, status);
          console.log("Status changed to open");
        }
      }
      else {
        console.log("Registration is closed");
        if (status == chat.description) {
          console.log("No Change");
        }
        else {
          bot.sendMessage(chatId, "Registration is CLOSED!!");
          bot.setChatDescription(chatId, status);
          console.log("Status changed to closed");
        }
      }
    });
    callback(null, responseStatus);
  });
  });
};
