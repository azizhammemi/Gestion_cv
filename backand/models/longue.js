const mongoose = require("mongoose");
const langageSchema = mongoose.Schema({
  description: {
    type: String,
    required: "description is required",
  },
  cvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cv",
  },
});
module.exports = mongoose.model("langage", langageSchema);
