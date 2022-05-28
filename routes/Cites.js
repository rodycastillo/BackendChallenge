const cite = require("express").Router();
const {
  createCite,
  updateCite,
  getCite,
  getAllCites,
  deleteCite 
} = require('../controllers/Cites.controller')

cite.post("/", createCite);

cite.get("/puppy/:dni", getCite);

cite.put("/puppy/:id", updateCite);

cite.get("/puppies", getAllCites);

cite.delete('/puppy/:id', deleteCite)

module.exports = cite;
