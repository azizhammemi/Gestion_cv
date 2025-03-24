const mongoose = require("mongoose");
const condidatSchema = mongoose.Schema({
  nom: {
    type: String,
    required: "nom is required",
  },
  prenom: {
    type: String,
    required: "prenom is required",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("condidat", condidatSchema);
