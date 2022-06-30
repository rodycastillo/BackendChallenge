const Cite = require("../schemas/Cite");
const twilioTextMessage = require("../helpers/sendTextMessage");

// Create Cite

const createCite = async (req, res) => {
  try {
    console.log(req.body);
    const NewCite = new Cite({
      username: req.body.username,
      puppyPhoto: req.body.image,
      puppyName: req.body.puppyName,
      status: req.body.status,
      characters: {
        service: req.body.service,
        specifications: req.body.specifications,
      },
      dni: req.body.dni,
      phone: req.body.phone,
    });
    // await twilioTextMessage({puppyName: req.body.puppyName, phone: req.body.phone})
    const cite = await NewCite.save();
    return res
      .status(200)
      .json({ message: "saved successfully", cite, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

// Update Cite

const updateCite = async (req, res) => {
  try {
    const updateCite = await Cite.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "updated successfully", updateCite, status: true });
  } catch (error) {
    res.status(403).json({ message: "You are not allowed!", status: false });
  }
};

// Get One Puppy

const getCite = async (req, res) => {
  try {
    const puppy = await Cite.findOne({ dni: req.params.dni });
    !puppy &&
      res.status(401).json({ message: "Puppy not found", status: false });

    res.status(200).json({ message: "Puppy found!!", puppy, status: true });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

// Get All Cites

const getAllCites = async (req, res) => {
  try {
    const puppies = await Cite.find();
    res.status(200).json({
      message: "Puppies found",
      puppies: puppies.reverse(),
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

const deleteCite = async (req, res) => {
  const _id = req.params.id;

  try {
    const DeleteCite = await Cite.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ message: "The cite has been deleted", DeleteCite, status: true });
  } catch (error) {
    res.status(403).json({ message: error, status: false });
  }
};

module.exports = {
  createCite,
  updateCite,
  getCite,
  getAllCites,
  deleteCite,
};
