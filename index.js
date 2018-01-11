exports.handler = (event, context, callback) => {
  const https = require("https");
  const url = "https://www.binance.com/info/getRegisterOpen.html";
  const TelegramBot = require("node-telegram-bot-api");
  //Telegram Bot Key
  const token = "<Telegram-Bot-Key>";
  const bot = new TelegramBot(token, { polling: false, filepath: false });
  //Channel ID - "@binancecheck"
  const chatId = "<chat_id>";

  // GET request to return json data - Used to check if Binanac has open registration
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
  });
  // GET response
  res.on("end", () => {
    body = JSON.parse(body);
    console.log("Registration: " + body.registerOpen);
    var status = body.registerOpen;
    var responseStatus = "Registration: " + body.registerOpen;
    // Checks description of channel (it will be 'true' or 'false')
    bot.getChat(chatId).then(function (chat) {
      if (status == "true") {
        console.log("Registration is Open");
        if (status == chat.description) {
          console.log("No Change");
        }
        else {
          // Send message to channel
          bot.sendMessage(chatId, "Registration is OPEN!!");
          bot.sendMessage(chatId, "https://www.binance.com/register.html?ref=12692139");
          // Update descrition to binance registration status ('true' or 'false')
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
          // Send message to channel
          bot.sendMessage(chatId, "Registration is CLOSED!!");
          bot.setChatDescription(chatId, status);
          // Update descrition to binance registration status ('true' or 'false')
          console.log("Status changed to closed");
        }
      }
    });
    callback(null, responseStatus);
  });
  });
};
