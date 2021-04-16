module.exports = async (req, res, next) => {
  try {
    if (req.user.role.toLowerCase() === "admin") {
      next();
    } else {
      res.status(401).send({ error: "You don't have permision" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};
