const TelegramBot = require('node-telegram-bot-api');
const token = '6645647504:AAGqKG-TYuy9T_49YklwWbCJpnDt_7UvhOM';
const bot = new TelegramBot(token, { polling: true });
const BotController = require('./controllers/BotController');

// Escute as mensagens recebidas.
bot.on('message', async (msg) => {
  console.log("Bot ouvindo mensagens");
  const chatId = msg.chat.id.toString();
  const chatIdStringfied = JSON.stringify(chatId)
  const message = msg.text;
  BotController.saveMessage(chatIdStringfied, message)


  // Responda à mensagem.
  // BotController.answerMessage(chatId, message);
    bot.sendMessage(chatId, message);

});

