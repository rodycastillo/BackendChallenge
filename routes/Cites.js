const cite = require("express").Router();
const {
  newCite,
  updateCite,
  getCite,
  getAllCites,
  deleteCite 
} = require('../controllers/Cites.controller')

cite.post("/", newCite);

cite.get("/puppy", getCite);

cite.put("/puppy/:id", updateCite);

cite.get("/puppies", getAllCites);

cite.delete('/puppy/:id', deleteCite)

module.exports = cite;
