const express = require("express");
const router = express.Router();

const Timing = require("../models/ShowTiming");
const Audi = require("../models/Audi");
const Movies = require("../models/Movies");

router.post("/timing/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const audi = (await Audi.find({ name: req.body.audi }))[0];
    if (!audi) {
      return res.status(400).send({ error: "invalid audi" });
    }
    req.body = {
      ...req.body,
      audi: audi._id,
      movie: movieId,
      capacity: audi.capacity,
    };
    switch (req.body.slot.toLowerCase()) {
      case "slot1":
        delete req.body.slot;
        req.body["slot1"] = true;
        break;
      case "slot2":
        delete req.body.slot;
        req.body["slot2"] = true;
        break;
      default:
        delete req.body.slot;
        req.body["slot3"] = true;
    }

    const slot = Object.keys(req.body).find((item) => item.includes("slot"));
    const searchKey = { date: req.body.date, audi: audi._id };
    searchKey[slot] = true;
    if ((await Timing.find(searchKey)).length !== 0) {
      res.status(400).send({ error: "Already booked" });
    } else {
      const book = new Timing(req.body);
      await book.save();

      res.status(201).send(book);
    }
  } catch (e) {
    console.log(e);
    req.status(400).send(e);
  }
});

router.get("/timing/audi", async (req, res) => {
  // Check for the avaialblity of the Audi
  try {
    const audi = (await Audi.find({ name: req.body.audi }))[0];
    if (!audi) {
      return res.status(400).send({ error: "invalid audi" });
    }
    const slots = await Timing.find({ audi: audi._id, date: req.body.date });
    const freeSlots = {
      slot1: "Free",
      slot2: "Free",
      slot3: "Free",
    };
    slots.forEach((slot) => {
      if (slot.slot1 === true) {
        freeSlots.slot1 = "Booked";
      } else if (slot.slot2 === true) {
        freeSlots.slot2 = "Booked";
      } else if (slot.slot3 === true) {
        freeSlots.slot2 = "Booked";
      }
    });
    res.status(200).send(freeSlots);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/timing/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  const movies = await Timing.find({ movie: movieId, date: req.body.date })
    .populate("movie audi")
    .exec();

  return res.send(movies);
});

module.exports = router;
