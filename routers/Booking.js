const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

router.post("/booking", auth, async (req, res) => {
  try {
    console.log(req.body);
    const booking = new Booking(req.body);
    const booked = await booking.findMovieAndBookSeat();
    if (!booked) {
      return res.status(400).send({ error: "not able to book" });
    }
    booked.user = req.user.id;
    await booked.save();
    booked.message = "Ticket Booked Sucessfully";
    res.status(201).send(booked);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/bookings", auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "booking",
      })
      .execPopulate();
    console.log(req.user.booking);
    res.status(200).send(req.user.booking);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
