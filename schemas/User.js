const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    rol: {
      type: String,
      required: true,
      default: "USER_ROLE",
      emun: ["ADMIN_ROLE", "USER_ROLE"],
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.methods.toJSON = function () {
//   const { __v, password, _id, ...user } = this.toObject();
//   user.uid = _id;
//   return user;
// };

module.exports = mongoose.model("User", UserSchema);
