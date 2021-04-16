const express = require("express");
const User = require("../models/Users");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (request, response) => {
  // this Block is responsible for the Creation Of the User
  const user = new User(request.body);
  try {
    const token = await user.generateAuthToken();
    response.status(201).send({ user, token });
  } catch (e) {
    response.status(400).send(e);
  }
});

router.post("/users/login", async (request, response) => {
  // this Block is responsible for the Login Of the User
  try {
    const user = await User.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateAuthToken();
    response.status(200).send({ user, token });
  } catch (e) {
    response.status(400).send({ Error: "Unable to Login" });
  }
});

router.get("/user/profile", auth, async (request, response) => {
  response.send(request.user);
});

router.post("/user/logout", auth, async (request, response) => {
  try {
    request.user.tokens = request.user.tokens.filter(
      (token) => token.token !== request.token
    );
    await request.user.save();
    response.send({ ErrMsg: "SuccessFully Logout" });
  } catch (e) {
    response.send(e);
  }
});

router.patch("/user/profile", auth, async (request, response) => {
  const update = Object.keys(request.body);
  const allowedUpdate = ["name", "age", "email", "password"];
  const isValid = update.every((item) => allowedUpdate.includes(item));
  if (!isValid) {
    return response
      .status(400)
      .send({ Errmsg: "Please enter the valid request" });
  }
  try {
    // await request.user.updateOne(request.body);
    update.forEach((item) => (request.user[item] = request.body[item]));
    await request.user.save();
    response.status(204).send();
  } catch (e) {
    response.send(e);
  }
});

router.post("/user/logoutAll", auth, async (request, response) => {
  try {
    request.user.tokens = [];
    await request.user.save();
    response
      .status(200)
      .send({ Errmsg: "Sucessfully logout from all devices" });
  } catch (e) {
    response.status(400).send(e);
  }
});

module.exports = router;
