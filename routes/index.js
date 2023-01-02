const router = require("express").Router();
var adbs = require("ad-bs-converter");
const fs = require("fs");

var d = new Date();
var formattedEnglishDate = d.getFullYear() + "/" + [d.getMonth() + 1] + "/" + d.getDate();
var nepaliDateconverter = adbs.ad2bs(formattedEnglishDate);
var monthNepali = new Array(11);
monthNepali[0] = "बैशाख";
monthNepali[1] = "जेठ";
monthNepali[2] = "असार";
monthNepali[3] = "श्रावण";
monthNepali[4] = "भदौ";
monthNepali[5] = "आश्विन";
monthNepali[6] = "कार्तिक";
monthNepali[7] = "मंसिर";
monthNepali[8] = "पुष";
monthNepali[9] = "माघ";
monthNepali[10] = "फाल्गुन";
monthNepali[11] = "चैत्र";
var nepaliMonth = nepaliDateconverter.en.month - 1;
var nepaliYear = nepaliDateconverter.ne.year;
var nepaliDay = nepaliDateconverter.ne.day;
var formattedNepaliDate = nepaliDay + " " + monthNepali[nepaliMonth] + "," + " " + nepaliYear;

/*nepali date*/
router.get("/nepali-date", function (req, res, next) {
  res.send(formattedNepaliDate);
});

/*nepali date*/
router.get("/footer-news", function (req, res, next) {
  let newsFooter = [];
  try {
    let newsData = fs.readFileSync(__dirname + "/../data/news.json");
    newsFooter = JSON.parse(newsData);
  } catch (e) {
    console.log(e);
  }
  res.send(newsFooter.slice(0, 3));
});

/*Home Page*/
router.get("/", async (req, res, next) => {
  let news = [];
  try {
    let newsData = fs.readFileSync(__dirname + "/../data/news.json");
    news = JSON.parse(newsData);
  } catch (e) {
    console.log(e);
  }
  let forex = [];
  try {
    let forexData = fs.readFileSync(__dirname + "/../data/forex.json");
    forex = JSON.parse(forexData);
  } catch (e) {
    console.log(e);
  }
  let vegetables = [];
  try {
    let vegetableData = fs.readFileSync(__dirname + "/../data/vegetables.json");
    vegetables = JSON.parse(vegetableData);
  } catch (e) {
    console.log(e);
  }
  let bullion = [];
  try {
    let bullionData = fs.readFileSync(__dirname + "/../data/bullion.json");
    bullion = JSON.parse(bullionData);
  } catch (e) {
    console.log(e);
  }
  let stocks = [];
  try {
    let stocksData = fs.readFileSync(__dirname + "/../data/stocks.json");
    stocks = JSON.parse(stocksData);
  } catch (e) {
    console.log(e);
  }
  let horoscope = [];
  try {
    let horoscopeData = fs.readFileSync(__dirname + "/../data/horoscope.json");
    horoscope = JSON.parse(horoscopeData);
  } catch (e) {
    console.log(e);
  }
  let fbvideos = [];
  try {
    let fbdata = fs.readFileSync(__dirname + "/../data/fb-videos.json");
    fbvideos = JSON.parse(fbdata);
  } catch (e) {
    console.log(e);
  }
  var bullionImages = [
    "https://assets.rumsan.com/askbhunte/assets/img-gold.png",
    "https://assets.rumsan.com/askbhunte/assets/img-gold.png",
    "https://assets.rumsan.com/askbhunte/assets/img-silver.png"
  ];
  var horoscopeImages = await getHoroscopeImages();
  res.render("index", {
    title: "Homepage - Ask Bhunte",
    data: news,
    forex: forex.slice(1, 4),
    vegetablesPrice: vegetables.slice(0, 3),
    bullionPrice: bullion,
    horoscope: horoscope,
    hImages: horoscopeImages,
    bullionImages: bullionImages,
    share: stocks.slice(0, 3),
    fbvideos
  });
});

/*forex*/
router.get("/forex", async (req, res, next) => {
  let forex = [];
  try {
    let forexData = fs.readFileSync(__dirname + "/../data/forex.json");
    forex = JSON.parse(forexData);
  } catch (e) {
    console.log(e);
  }
  res.render("forex", {
    title: "Foreign Exchange Rates  - Ask Bhunte",
    data: forex
  });
});

/*vegetables*/
router.get("/vegetables", async (req, res, next) => {
  let vegetables = [];
  try {
    let vegetableData = fs.readFileSync(__dirname + "/../data/vegetables.json");
    vegetables = JSON.parse(vegetableData);
  } catch (e) {
    console.log(e);
  }
  res.render("vegetables", {
    title: "Vegetables price  - Ask Bhunte",
    data: vegetables
  });
});

/*Bullion*/
router.get("/bullion", async (req, res, next) => {
  let bullion = [];
  try {
    let bullionData = fs.readFileSync(__dirname + "/../data/bullion.json");
    bullion = JSON.parse(bullionData);
  } catch (e) {
    console.log(e);
  }
  res.render("bullion", {
    title: "Bullion price  - Ask Bhunte",
    data: bullion
  });
});

/*stocks*/

router.get("/stocks", async (req, res, next) => {
  let stocks = [];
  try {
    let stocksData = fs.readFileSync(__dirname + "/../data/stocks.json");
    stocks = JSON.parse(stocksData);
  } catch (e) {
    console.log(e);
  }
  res.render("stocks", {
    title: "Share price  - Ask Bhunte",
    data: stocks
  });
});

/*horoscope*/
router.get("/horoscope", async (req, res, next) => {
  let horoscope = [];
  try {
    let horoscopeData = fs.readFileSync(__dirname + "/../data/horoscope.json");
    horoscope = JSON.parse(horoscopeData);
  } catch (e) {
    console.log(e);
  }
  var horoscopeImages = await getHoroscopeImages();
  res.render("horoscope", {
    title: "Today's Horoscope - Ask Bhunte",
    data: horoscope,
    horoscopeImages: horoscopeImages
  });
});

/*learn more about chat bot*/

router.get("/chatbot", function (req, res, next) {
  res.render("chatbot", {
    title: "Learn more about chatbot - Ask Bhunte"
  });
});

/*About us*/

router.get("/about-us", function (req, res, next) {
  res.render("about-us", {
    title: "About us - Ask Bhunte"
  });
});

/*katha4nepal about-us */
router.get("/katha4Nepal", function (req, res, next) {
  res.render("katha4nepal/about-us", {
    title: "About us - Ask Bhunte"
  });
});

/*horoscope Images*/
async function getHoroscopeImages() {
  var x = [
    "https://assets.rumsan.com/askbhunte/assets/libra-1.png",
    "https://assets.rumsan.com/askbhunte/assets/aries.png",
    "https://assets.rumsan.com/askbhunte/assets/leo.png",
    "https://assets.rumsan.com/askbhunte/assets/virgo.png",
    "https://assets.rumsan.com/askbhunte/assets/scorpio.png",
    "https://assets.rumsan.com/askbhunte/assets/sagittarius.png",
    "https://assets.rumsan.com/askbhunte/assets/capricorn.png",
    "https://assets.rumsan.com/askbhunte/assets/aquarius.png",
    "https://assets.rumsan.com/askbhunte/assets/pisces.png",
    "https://assets.rumsan.com/askbhunte/assets/gemini.png",
    "https://assets.rumsan.com/askbhunte/assets/cancer.png",
    "https://assets.rumsan.com/askbhunte/assets/taurus.png"
  ];
  return x;
}



/*Privacy Policy*/

router.get("/privacy-policy", function (req, res, next) {
  res.render("privacy-policy", {
    title: "Privacy Policy - Ask Bhunte"
  });
});

router.get("/about", function (req, res, next) {
  res.render("askbhunte-about/about", {
    title: "About - Ask Bhunte"
  });
});

const uiRouter = require("./ui/index");
const apiRouter = require("./api/index");
const updateRouter = require("./update/index");

router.use("/", uiRouter);
router.use("/api/v1", apiRouter);
router.use("/update", updateRouter);

module.exports = router;
