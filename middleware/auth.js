const jwt = require("jsonwebtoken");
const User = require("../models/Users");

module.exports = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    const decodeToken = jwt.verify(token, "abhishekbiswas");
    // console.log(decodeToken);
    const user = await User.findOne({
      _id: decodeToken.id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("Caanot Find the User");
    }
    request.token = token;
    request.user = user;
    next();
  } catch (e) {
    console.log(e);
    response.send({ Error: "Please authenticate" });
  }
};
