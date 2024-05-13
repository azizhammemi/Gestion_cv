var User = require("../models/user");
var condidat = require("../models/condidat");
var entreprise = require("../models/entreprise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var { ROLE, PASSWRD_REGEX, EMAIL_REGEX } = require("../Config/handler.config");
exports.login = async (req, res) => {
  const { email, password } = req.body;
  //simple validation
  if (!email || !password) {
    return res.status(401).json({ msg: "Email or password non saisies" });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(401).json({ erreur: "Email non valide" });
  }
  try {
    //vérifier l'existance de l'utilisateur
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ erreur: "utilisateur non existant" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(401).json({ msg: "mot de passe incorrect" });
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 3600,
    });
    if (!token) throw Error("Couldnt sign the token");
    res.status(200).json({
      token,
      user,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
/**
 * @route POST api/auth/register
 * @desc Register new user
 * @access Public
 */
exports.register = async (req, res) => {
  const {
    email,
    password,
    adresse,
    telephone,
    dateouverture,
    nomEntreprise,
    nom,
    prenom,
  } = req.body;
  //simple validation
  const { role } = req.params;
  if (!ROLE.includes(role)) {
    return res.status(400).json({ msg: "role non valide!" });
  }
  if (!email || !password) {
    return res.status(400).json({ msg: "Email or password non saisies" });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ erreur: "Email non valide" });
  }
  if (!PASSWRD_REGEX.test(password)) {
    return res.status(400).json({ erreur: "password non valide" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hash,
      role,
      adresse,
      telephone,
    });
    switch (role) {
      case "entreprise":
        await entreprise.create({
          dateouverture,
          nomEntreprise,
          userId: user._id,
        });

        break;
      case "condidat":
        await condidat.create({
          nom,
          prenom,
          userId: user._id,
        });
        break;
      default:
        break;
    }
    return res.status(201).json({ message: "user crée" });
  } catch (erreur) {
    return res.status(500).json({ erreur });
  }
};
exports.logout = async (req, res) => {
  try {
    // Envoyer une réponse de succès
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
};
