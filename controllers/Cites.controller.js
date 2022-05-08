const Cite = require("../schemas/Cite")

// Create Cite

const newCite = async (req, res) => {
    const NewCite = new Cite({
        username: req.body.username,
        puppyPhoto: "",
        puppyName: req.body.puppyName,
        status: req.body.status,
        characters: req.body.characters,
        dni: req.body.dni,
        phone: req.body.phone,
      });
      try {
        const cite = await NewCite.save();
        res.status(200).json({ message: "saved successfully", cite, status: true });
      } catch (error) {
        res.status(500).json({ message: error, status: false });
      }
      res.send(req.body);
}

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
}

// Get One Puppy

const getCite = async (req, res) => {
    try {
      const puppy = await Cite.findOne({ dni: req.body.dni });
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
}


module.exports = {
    newCite,
    updateCite,
    getCite,
    getAllCites
}