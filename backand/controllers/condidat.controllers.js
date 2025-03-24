const condidat = require("../models/condidat");
const router = require("express").Router();
const body = require("body-parser");

exports.getCondidatByuserId = async (req, res) => {
  try {
    
    var result = await condidat
      .find({ userId: req.params.userId })
      .populate("userId")
      .exec();
    return res.status(200).json({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
};
