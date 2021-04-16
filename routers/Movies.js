const express = require("express");
const router = express.Router();

const Movies = require("../models/Movies");

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).send(movies);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
});

router.post("/movies", async (req, res) => {
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
