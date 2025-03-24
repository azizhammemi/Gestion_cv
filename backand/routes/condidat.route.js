module.exports = (app) => {
  const condidat = require("../controllers/condidat.controllers");
 
  app.get("/condidat/user/:userId", condidat.getCondidatByuserId);
  
};
