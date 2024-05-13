const entreprise = require("../models/entreprise");
const router = require("express").Router();
const body = require("body-parser");

exports.getEntrepriseByuserId = async (req, res) => {
  try {
    var result = await entreprise
      .find({ userId: req.params.userId })
      .populate("userId")
      .exec();
    return res.status(200).json({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
};
