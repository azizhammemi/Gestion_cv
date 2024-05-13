const mongoose = require("mongoose");
const cvSchema = mongoose.Schema({
  cvCondidat: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("cv", cvSchema);
