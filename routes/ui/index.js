const router = require("express").Router();
const NeaRouter = require("../../modules/nea/nea.routes.ui");
const axios = require("axios");

router.get("/confirmation", (req, res, next) => {
  res.render("thankyou");
});

router.get("/hackcheck", (req, res, next) => {
  res.render("hackcheck/index");
});

router.get("/see", (req, res, next) => {
  let symbol = req.query.symbol || '';
  const check = /^[A-Za-z]+$/;
  if (symbol.length != 9) symbol = "";
  let dob = req.query.dob || '';
  if (dob.length === 10 || !check.test(dob)) {
    var year = String(dob.split("-")[0]) || '';
    var month = String(dob.split("-")[1]) || '';
    var day = String(dob.split("-")[2]) || '';
  } else {
    var year = '';
    var month = '';
    var day = '';
  }
  res.render("see/index", {
    symbol: symbol || '',
    year: year === "undefined" ? '' : year,
    month: month === "undefined" ? '' : month,
    day: day === "undefined" ? '' : day
  });
});


router.use("/nea", NeaRouter);

router.get("/movies/imdb/:id", async (req, res, next) => {
  axios.get("http://bit.ly/bhunte_movie_trailer");
  let {
    data
  } = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=7b3c4a08dd13cf89b0acaa683ca32294`);

  let vidres = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=7b3c4a08dd13cf89b0acaa683ca32294`);

  let omdb = await axios.get(`http://www.omdbapi.com/?i=${req.params.id}&apikey=e72783d6`);

  let trailer = vidres.data.results.find(d => {
    return d.type == "Trailer";
  });

  let payload = {
    imdb_id: req.params.id,
    name: data.title,
    summary: data.overview,
    release_date: data.release_date,
    year: omdb.data.Year,
    length: data.runtime,
    genre: omdb.data.Genre,
    thumbnail_url: `http://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
    trailer: trailer.key,
    director: omdb.data.Director,
    casts: omdb.data.Actors
  };

  res.render("movies/details", {
    title: "Movie",
    data: payload
  });
});

module.exports = router;