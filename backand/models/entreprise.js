const mongoose = require("mongoose");
const entrepriseSchema = mongoose.Schema({
  dateouverture: {
    type: String,
    required: "date  is required",
  },
  nomEntreprise:String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("entreprise", entrepriseSchema);
