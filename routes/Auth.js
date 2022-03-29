const router = require("express").Router();
const User = require("../schemas/User");

router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol,
      dni: req.body.dni,
    });
    const newUser = await user.save();
    res
      .status(200)
      .json({ message: "User saved", user: newUser, status: true });
  } catch (error) {
    res.status(200).json({ message: error, status: false });
  }
});

module.exports = router;
