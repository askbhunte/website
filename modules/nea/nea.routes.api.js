const router = require("express").Router();
const axios = require("axios");
const config = require("config");

let baseUrl = config.get("services.bhunte.url");

router.post("/", async (req, res, next) => {
  try {
    let payload = { url: baseUrl + "/nea", method: "POST", data: req.body };
    let response = await axios(payload);
    let data = response.data;
    console.log(data);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});
router.post("/sendmessage", async (req, res, next) => {
  try {
    let response = await axios({
      url: baseUrl + "/nea/sendmessagetofixdata",
      method: "POST",
      data: req.body
    });
    res.json(response.data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res, next) => {
  let fbmsn_id = req.params.id;
  try {
    let response = await axios({
      url: baseUrl + "/nea/getNeaProfile/" + fbmsn_id,
      method: "GET"
    });
    res.json(response.data.neaprofile[0]);
  } catch (e) {
    console.log(e);
  }
});
router.put("/", async (req, res, next) => {
  try {
    let payload = { url: baseUrl + "/nea", method: "PUT", data: req.body };
    let response = await axios(payload);
    let data = response.data;
    console.log(data);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
