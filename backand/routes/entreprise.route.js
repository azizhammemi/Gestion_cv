module.exports = (app) => {
  const entreprise = require("../controllers/entreprise.controlleurs");

  app.get("/entreprise/user/:userId", entreprise.getEntrepriseByuserId);
};
