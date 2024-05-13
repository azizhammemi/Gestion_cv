const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: "Email is required",
    unique: true,
  },
  password: {
    type: String,
    required: "password is required",
  },
  role: {
    type: String,
    required: "role is required",
  },
  adresse: {
    type: String,
    required: "adresse is required",
  },
  telephone: {
    type: String,
    required: "telephone is required",
  },
});
module.exports = mongoose.model("user", userSchema);
