const router = require("express").Router();
var nodemailer = require("nodemailer");
const axios = require("axios");
const config = require("config");
const fs = require("fs");
const qs = require("qs");
const https = require("https");
const cheerio = require("cheerio");
let HCController = require("../../modules/misc/hackcheck");
let HCLog = require("../../modules/misc/hackcheck_log");

// router.get("/hackcheck/check", async (req, res, next) => {
//   try {
//     let search = req.query.search;
//     if (!search) throw Error("Must send search query");
//     let data = await HCController.check(search);
//     let isVianet = data.includes("Vianet");
//     let isFoodmandu = data.includes("Foodmandu");
//     HCLog.add({ ip: "API", search, is_hacked: isVianet || isFoodmandu });
//     res.json({ isVianet, isFoodmandu, isHacked: isVianet || isFoodmandu });
//   } catch (e) {
//     next(e);
//   }
// });

router.get("/hackcheck/log-count", async (req, res, next) => {
  let date = req.query.date;
  HCLog.count(date)
    .then(d => res.json(d))
    .catch(e => next);
});
/*update-news*/
router.get("/update", async (req, res, next) => {
  var news = await axios
    .get(`${config.get("services.api.news")}`)
    .then(data => {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].img_url = data.data[i].img_url
          ? data.data[i].img_url.split("smart/")[1]
          : "https://assets.rumsan.com/askbhunte/assets/default-askbhunte.jpg";
      }
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].created_at = data.data[i].created_at.slice(0, 10);
        data.data[i].created_at = dateFormatter(data.data[i].created_at);
      }
      return data;
    })
    .catch(e => console.log(e));
  var forex = await getForex();
  var vegetables = await getVegetablePrice();
  var bullion = await getBullionPrice();
  var bullionFilter = Object.values(bullion.data[0].data);
  var stocks = await getStocksPrice();
  var horoscope = await getHoroscope();
  var horoscopeFilter = Object.values(horoscope.data[0].data);
  fs.writeFileSync("./data/news.json", JSON.stringify(news.data, null, 4));
  fs.writeFileSync("./data/horoscope.json", JSON.stringify(horoscopeFilter, null, 4));
  fs.writeFileSync("./data/stocks.json", JSON.stringify(stocks.data, null, 4));
  fs.writeFileSync("./data/bullion.json", JSON.stringify(bullionFilter, null, 4));
  fs.writeFileSync("./data/vegetables.json", JSON.stringify(vegetables.data, null, 4));
  fs.writeFileSync("./data/forex.json", JSON.stringify(forex.data, null, 4));
  if (forex || horoscope || vegetables || stocks) res.json("Update Complete");
});

/* get forex*/

async function getForex() {
  return await axios
    .get(`${config.get("services.api.baseUrl")}${config.get("services.api.forex")}`)
    .then(data => {
      return data;
    })
    .catch(e => console.log(e));
}

/* get vegetable price*/

async function getVegetablePrice() {
  return await axios
    .get(`${config.get("services.api.vegetables")}`)
    .then(data => {
      return data;
    })
    .catch(e => console.log(e));
}

/* get bullion price*/
async function getBullionPrice() {
  return await axios
    .get(`${config.get("services.api.bullion")}`)
    .then(data => {
      return data;
    })
    .catch(e => console.log(e));
}
/* get stocks*/

async function getStocksPrice() {
  return await axios
    .get(`${config.get("services.api.stocks")}`)
    .then(data => {
      return data;
    })
    .catch(e => console.log(e));
}
/* get horoscope*/

async function getHoroscope() {
  return await axios
    .get(`${config.get("services.api.horoscope")}`)
    .then(data => {
      return data;
    })
    .catch(e => console.log(e));
}

/* date formatter*/
function dateFormatter(forexDate) {
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var forexMonth = forexDate.slice(5, 7) - 1;
  var forexDay = forexDate.slice(8, 10);
  var forexYear = forexDate.slice(0, 4);
  var formatedForexDate = month[forexMonth] + " " + forexDay + "," + " " + forexYear;
  return formatedForexDate;
}

const neaRouter = require("../../modules/nea/nea.routes.api");
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "raj69uttam@gmail.com ",
    pass: ""
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true
});

router.get("/send", function (req, res) {
  var mailOptions = {
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

router.post("/see", async (req, res) => {
  let symbol = req.body.symbol;
  symbol = symbol.slice(0, 8);
  const dob = req.body.dob;
  let bodyFormData = qs.stringify({
    symbol,
    dob,
    submit: "submit"
  });
  let result = await axios({
    method: "POST",
    url: "https://see.ntc.net.np/results/gradesheet",
    data: bodyFormData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  var $ = cheerio.load(result.data);
  var html = $("#webform").find("table").html();
  if (!html) {
    html = `<br><div class="text-center text-danger">Your Symbol number or Date of Birth is Invalid.<br><br></div>`;
  }
  res.send(html);
});
router.use("/nea", neaRouter);

module.exports = router;
