const ignoreVideosId = ["417399518837209", "2291841820863708"];

const axios = require("axios");
const fs = require("fs");
var router = require("express").Router();

router.get("/fbvideos", async (req, res, next) => {
  if (!req.query.token) {
    res.send("Must send token");
    res.end();
  }

  try {
    let length = await getFBVideos(req.query.token);
    res.send(length.toString());
  } catch (e) {
    next(e);
  }
});

module.exports = router;











const getFBVideos = async token => {
  let paging = {
    next:
      "https://graph.facebook.com/v5.0/askbhunte/videos?limit=5&fields=created_time,description,live_status,length,title,format&access_token=" +
      token
  };

  let results = [];
  while (true) {
    let response = await axios(paging.next);
    console.log(response)
    response.data.data = response.data.data.filter(d => !ignoreVideosId.includes(d.id));
    response.data.data = response.data.data.filter(d => d.live_status === undefined);
    response.data.data = response.data.data.filter(d => d.title != undefined);
    results = [...results, ...response.data.data];
    paging = response.data.paging;
    if (!response.data.paging.next) break;
  }

  console.log(results)
  fs.writeFileSync(__dirname + "/../../data/fb-videos.json", JSON.stringify(results, null, 2));
  return results.length;
};
