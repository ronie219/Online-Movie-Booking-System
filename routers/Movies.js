const express = require("express");
const router = express.Router();

const Movies = require("../models/Movies");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/movies", auth, admin, async (req, res) => {
  try {
    const match = {};
    console.log(req.query.name);
    if (req.query.name) {
      match["name"] = req.query.name;
    }
    const movies = await Movies.find(match);
    res.status(200).send(movies);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
});

router.post("/movies", auth, admin, async (req, res) => {
  try {
    const movie = new Movies(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
});

module.exports = router;
