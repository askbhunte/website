const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("nea/index");
});
router.get("/update", (req, res, next) => {
  res.render("nea/update");
});

module.exports = router;
