const mongoose = require("mongoose");
const comptenceTechniqueSchema = mongoose.Schema({
  description: {
    type: String,
    required: "description is required",
  },
  cvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cv",
  },
});
module.exports = mongoose.model("conpetanceTechnique", comptenceTechniqueSchema);
