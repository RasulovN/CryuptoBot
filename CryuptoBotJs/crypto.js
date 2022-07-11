const { Telegraf } = require("telegraf");
const express = require('express')
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const app = express()

const bot = new Telegraf(process.env.BOT_TOKEN
const apikey = process.env.API_KEY
//const apikey = "5123a1f29633b681ed2efbd4913fb2e969741f953fcbf2edb4a8cebf9bc62f31c19123";

//Start bot command
bot.start((ctx) => {
  checkChannel(ctx);
});

// Check Channel
function checkChannel(ctx) {
  checked(ctx);
  bot.action("backCheck", async(ctx) => {
    await ctx.deleteMessage();
    await ctx.reply("You are not yet subscribed to a channel to use the bot");
    checked(ctx);
  });
  function  checked(ctx) {
    ctx.telegram.getChatMember("-1001685824568", ctx.chat.id)
    .then((data) =>
      data.status == "left"
        ? ctx.reply("Join our Channel to use the bot", {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Become a member 📢",
                    url: "https://t.me/general_ITblog",
                  },
                ],
                [{ text: "Check ✅", callback_data: "backCheck" }],
              ],
            },
          })
        : ctx.reply(`Select the menu`, sendStartMessage(ctx))
    )
    // .catch("siz a'zo emassiz")
  }
}

// Bot workinng start
bot.action("start", (ctx) => {
  ctx.deleteMessage();
  sendStartMessage(ctx);
});

function sendStartMessage(ctx) {
  let startMessage = `Hi ${ctx.chat.first_name}, Crypto bot Welcome, you can find out about cryptocurrency price changes through me `;
  bot.telegram.sendMessage(ctx.chat.id, startMessage, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Electron crypto 🪙", callback_data: "price" }],
        [{ text: "Coin market cap", url: "https://www.cryptocompare.com/" }],
        [{ text: "Bot Info", callback_data: "info" }],
      ],
    },
  });
}
// Crypto menu
bot.action("price", (ctx) => {
  let priceMesage = "Crypto exchange rates";
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, priceMesage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Bitcoin", callback_data: "price-BTC" }, //1 Bitcoin
          { text: "Ethereum", callback_data: "price-ETH" }, //2 Ethereum
          { text: "LTC", callback_data: "price-LTC" }, //3 Litecoin
          { text: "XRP", callback_data: "price-XRP" }, // 4 XRP
        ],
        [
          { text: "Fantom", callback_data: "price-FTM" }, //5 Fantom
          { text: "BNB", callback_data: "price-BNB" }, //7 Binance Coin
          { text: "LUNA", callback_data: "price-LUNA" }, //6 Terra LUNA
          { text: "BUSD", callback_data: "price-BUSD" }, //8 BUSD
        ],
        [
          { text: "Solana", callback_data: "price-SOL" }, //9 Solana
          { text: "Cardano", callback_data: "price-ADA" }, //10 Cardano
          { text: "Cosmos", callback_data: "price-ATOM" }, // 11Cosmos
          { text: "WBTC", callback_data: "price-WBTC" }, //12 Wrapped Bitcoin
        ],
        [
          { text: "Chainlink", callback_data: "price-LINK" }, //13 Chainlink
          { text: "Near", callback_data: "price-NEAR" }, //14 Near
          { text: "QTUM", callback_data: "price-QTUM" }, //15 QTUM
          { text: "BCH", callback_data: "price-BCH" }, //16 Bitcoin Cash
        ],
        [
          { text: "Aave", callback_data: "price-AAVE" }, //17 Aave
          { text: "ZCash", callback_data: "price-ZEC" }, //18 ZCash
          { text: "Swipe", callback_data: "price-SXP" }, //19 Swipe
          { text: "CELR", callback_data: "price-CELR" }, //20 Celer Network
        ],
        [{ text: "Back menu ↩️", callback_data: "start" }],
      ],
    },
  });
});

let priceActionList = [
  "price-BTC", //1 Bitcoin
  "price-ETH", //2 Ethereum
  "price-LTC", //3 Litecoin
  "price-XRP", //4 XRP

  "price-FTM", //5 Fantom
  "price-LUNA", //6 Terra LUNA
  "price-BNB", //7 Binance Coin
  "price-BUSD", //8 BUSD

  "price-SOL", //9 SOL
  "price-ADA", //10 Cardano
  "price-ATOM", //11 Cosmos
  "price-WBTC", //12 Wrapped Bitcoin

  "price-LINK", //13 Chainlink
  "price-NEAR", //14 Near
  "price-QTUM", //15 QTUM
  "price-BCH", //16 Bitcoin Cash

  "price-AAVE", //17 Aave
  "price-ZEC", //18 ZCash
  "price-SXP", //19 Swipe
  "price-CELR", //20 Celer Network
];
// Crypto responsive
bot.action(priceActionList, async (ctx) => {
  let symbol = ctx.match.toString().split("-")[1];
  try {
    let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=IDR&api_key=${apikey}`);
    let data = res.data.DISPLAY[symbol].IDR;
    let cryotoBot = "@CryptoBTC_Prices_bot";
    let message = `
    <b>Symbol:</b>   ${symbol}
    <b>PRICE:</b>  ${data.PRICE}
    <b>LASTUPDATE:</b>  ${data.LASTUPDATE}
    <b>SUPPLY:</b>  ${data.SUPPLY}
    <b>MKTCAP:</b>  ${data.MKTCAP}
    <b>OPENDAY:</b> ${data.OPENDAY}
    <b>HIGHDAY:</b>  ${data.HIGHDAY}
    <b>LOWDAY:</b>   ${data.LOWDAY}
    <b>OPEN24HOUR:</b>  ${data.OPEN24HOUR}
    <b>HIGH24HOUR:</b>  ${data.HIGH24HOUR}

    MEDIAN: ${data.MEDIAN}
    LASTVOLUME:  ${data.LASTVOLUME}
    LASTVOLUMETO:  ${data.LASTVOLUMETO} 
    LASTTRADEID:  ${data.LASTTRADEID}
    VOLUMEDAY:  ${data.VOLUMEDAY}
    VOLUMEDAYTO:  ${data.VOLUMEDAYTO}
    VOLUME24HOUR:  ${data.VOLUME24HOUR}
    VOLUME24HOURTO:  ${data.VOLUME24HOURTO}
    LOW24HOUR:  ${data.LOW24HOUR}
    LASTMARKET:  ${data.LASTMARKET}
    VOLUMEHOUR:  ${data.VOLUMEHOUR}
    OPENHOUR:  ${data.OPENHOUR}
    HIGHHOUR:  ${data.HIGHHOUR}
    LOWHOUR:  ${data.LOWHOUR}
    TOPTIERVOLUME24HOUR:  ${data.TOPTIERVOLUME24HOUR}
    TOPTIERVOLUME24HOURTO:  ${data.TOPTIERVOLUME24HOURTO}
    CHANGE24HOUR:  ${data.CHANGE24HOUR}
    CHANGEPCT24HOUR:  ${data.CHANGEPCT24HOUR}
    CHANGEDAY: ${data.PRICE}
    CHANGEPCTDAY:  ${data.CHANGEPCTDAY}
    CHANGEHOUR:  ${data.CHANGEHOUR}
    CHANGEPCTHOUR:  ${data.CHANGEPCTHOUR}
    CONVERSIONTYPE:  ${data.CONVERSIONTYPE}
    MKTCAPPENALTY: ${data.MKTCAPPENALTY}
    CONVERSIONSYMBOL: ${data.CONVERSIONSYMBOL}
    CIRCULATINGSUPPLY:  ${data.CIRCULATINGSUPPLY}
    CIRCULATINGSUPPLYMKTCAP: ${data.CIRCULATINGSUPPLYMKTCAP}
    TOTALVOLUME24H: ${data.TOTALVOLUME24H}
    TOTALVOLUME24HTO: ${data.TOTALVOLUME24HTO}
    TOTALTOPTIERVOLUME24H:  ${data.TOTALTOPTIERVOLUME24H}
    TOTALTOPTIERVOLUME24HTO:  ${data.TOTALTOPTIERVOLUME24HTO}
    IMAGEURL: https://www.cryptocompare.com${data.IMAGEURL}
    
<b>Completed by:</b>  ${cryotoBot}   
    `;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ text: "Go back", callback_data: "price" }]],
      },
    });
  } catch (err) {
    console.log(err);
    ctx.reply("Error, An error occurred on the server");
  }
});

//BOT INFO
bot.action("info", (ctx) => {
  ctx.answerCbQuery();
  bot.telegram.sendMessage(ctx.chat.id, "Bot info", {
    reply_markup: {
      keyboard: [
        [{ text: "Credits" }, { text: "API" }, { text: "Admin  🧑‍💻" }],
        [{ text: "Back-keyboard", callback_data: "price" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

//Button menu Credits, Api, Admin, Back menu
//CREDITS
bot.hears("Credits", (ctx) => {
  let cryotoBot = "@CryptoBTC_Prices_bot";
  ctx.reply(
    `
        You can use our site from the site where the <b>Credits</b> section is not built https://data.cryptocompare.com/research

<b>Completed by:</b>  ${cryotoBot}       
        `,
    { parse_mode: "HTML" }
  );
});

//API
bot.hears("API", (ctx) => {
  let cryotoBot = "@CryptoBTC_Prices_bot";
  ctx.reply(
    `
        Work on the <b>Api</b> section of the bot has not started yet https://min-api.cryptocompare.com/   

<b>Completed by:</b>  ${cryotoBot}
        `,
    { parse_mode: "HTML" }
  );
});
//ADMIN
bot.hears("Admin  🧑‍💻", (ctx) => {
  ctx.reply(
    `
        You can write your appeal and
 suggestions to the admin

<b>Cerator:</b><i> @rasulov_n7</i>
<b>Language:</b>  <i>Javascript</i>
<b>Framework:</b> <i>🔥NodeJs, TelegrafJs</i>
        `,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Channel 🛡", url: "https://t.me/general_ITblog" },
            { text: "Channel 🔰", url: "https://t.me/new_states" },
          ],
        ],
      },
    }
  );
});

//BACK MAIN MENU
bot.hears("Back-keyboard", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Main menu", {
    reply_markup: {
      remove_keyboard: true,
    },
  }),
    ctx.deleteMessage();
  sendStartMessage(ctx);
});

console.log("Bot is running...");
bot.launch();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
