const cvController = require("../controllers/cv.controllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "cv");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = (app) => {
  // Route pour créer un CV
  app.post("/cv", upload.single("cvCondidat"), cvController.creer);

  // Route pour modifier un CV existant
  app.put("/cv/:id", upload.single("cvCondidat"), cvController.modifier);
  app.get("/cv/:userId", cvController.getCVByIdUser);
  app.get("/cvss/:userId", cvController.getCVByIdUser1);
};
