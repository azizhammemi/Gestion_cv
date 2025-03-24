const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/cv", express.static("cv"));
require("dotenv").config({ path: ".env" });
// connexion à la base de donnée
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/recrutement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à la base de données MongoDB");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données MongoDB :", error);
  });
// appel aux routes

app.listen(5001, () => {
  console.log("Serveur port : 5000");
});
var loginRoutes = require("./routes/authentification");
app.use(
  cors({
    origin: "*",
  })
);
require("./routes/cv.route")(app);
require("./routes/entreprise.route")(app);
require("./routes/condidat.route")(app);

app.use("/api/auth", loginRoutes);
