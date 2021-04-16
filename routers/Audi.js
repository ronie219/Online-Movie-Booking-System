const express = require("express");
const router = express.Router();

const Audi = require("../models/Audi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/audi", auth, admin, async (req, res) => {
  try {
    const audi = await Audi.find();
    res.status(200).send(audi);
  } catch (e) {
    console.log(e);
    res.status(400).send("Bad request");
  }
});

router.post("/audi", auth, admin, async (req, res) => {
  try {
    const audi = Audi(req.body);
    await audi.save();
    res.status(201).send(audi);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
});

module.exports = router;
