const router = require("express").Router();
const User = require("../schemas/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
  try {
  const user = await User.findOne({dni: req.body.dni})
  if (!user) {
    res.status(401).json({message: "Invalid DNI", status: false})
  }
  const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

  originalPassword !== req.body.password &&
    res.status(401).json("Invalid Password");

  const token = jwt.sign(
    { id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "5d" }
  );
  const { password, ...info } = user._doc;

    res
      .status(200)
      .json({ message: "Successfully Login", user: info, token, status: true });
  } catch (err) {
    res.status(500).json({ message: err, status: false });
  }
});

router.post('/register', async (req, res)=> {
  if(!req.body) {
    res.status(401).json({message: "Complete the fields", status: false})
  }
  try {
    const {name, email, password, dni } = req.body

    const user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
      dni,
      rol: "USER_ROLE"
    })
    const createdUSer = await user.save()

    res.status(201).json({user: createdUSer, status: true})
  } catch (err) {
    res.status(500).json({message: err, status: false })
  }
})

module.exports = router;
