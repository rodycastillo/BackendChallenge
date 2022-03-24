const mongoose = require("mongoose");

const CiteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  date: {
    type: String,
    default: new Date(),
  },
  puppyPhoto: {
    type: String,
  },
  puppyName: {
    type: String,
    required: [true, "Puppy name is required"],
  },
  status: {
    type: String,
    required: [true, "Status of process is required"],
    default: "Unattended",
    enum: ["Unattended", "In process", "Attended"],
  },
  characters: {
    type: Object,
    required: true,
  },
});

// CiteSchema.methods.toJSON = function () {
//   const { __v, status, ...data } = this.toObject();
//   return data;
// };

module.exports = mongoose.model("Cite", CiteSchema);
