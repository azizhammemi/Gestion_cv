const mongoose = require("mongoose");
const offreSchema = mongoose.Schema({
  titre: String,
  description: String,

  technique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conpetanceTechnique",
  },
});
module.exports = mongoose.model("offre", offreSchema);
