const CV = require("../models/cv");

exports.creer = async (req, res) => {
  try {
    var cv = new CV({
      cvCondidat: req.file.filename,
      userId: req.body.userId,
    });
    var result = await cv.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const fs = require("fs");
const path = require("path");

exports.modifier = async (req, res) => {
  try {
    const cvCondidat = req.params.id;

    // Créez un objet contenant les champs à mettre à jour
    const updatedFields = {};

    // Vérifiez les champs que vous souhaitez mettre à jour dans req.body
    if (req.file && req.file.filename) {
      // Supprimer l'ancien fichier CV s'il existe
      const cv = await CV.findById(cvCondidat);
      if (cv && cv.cvCondidat) {
        const oldCVPath = path.join(__dirname, "../cv", cv.cvCondidat);
        fs.unlinkSync(oldCVPath);
      }
      updatedFields.cvCondidat = req.file.filename;
    }
    if (req.body.userId) {
      updatedFields.userId = req.body.userId;
    }

    // Utilisez findOneAndUpdate pour mettre à jour le CV
    const updatedCV = await CV.findByIdAndUpdate(cvCondidat, updatedFields, {
      new: true, // Renvoie le document mis à jour
      runValidators: true, // Exécutez les validateurs de schéma lors de la mise à jour
    });

    if (!updatedCV) {
      return res.status(404).send("CV non trouvé.");
    }

    res.send(updatedCV);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la mise à jour du CV.");
  }
};



exports.getCVByIdUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherchez le CV correspondant à l'ID de l'utilisateur
    const cv = await CV.findOne({ userId });

    if (!cv) {
      return res.status(404).send("CV non trouvé pour cet utilisateur.");
    }

    // Vérifier si l'utilisateur a soumis son CV
    if (!cv.cvCondidat) {
      return res
        .status(400)
        .send("L'utilisateur n'a pas encore soumis son CV.");
    }

    // Compter le nombre de candidats ayant postulé avec un CV
    const countCV = await CV.countDocuments({
      cvCondidat: { $exists: true, $ne: null },
    });

    // Envoyer le nom du CV et le compteur en réponse
    res.send({ cvNom: cv.cvCondidat, countCV });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération du CV.");
  }
};
// donner une valeur boolen si a postuler un cv ou non 
exports.getCVByIdUser1 = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherchez le CV correspondant à l'ID de l'utilisateur
    const cv = await CV.findOne({ userId });

    if (!cv) {
      return res.status(404).send("CV non trouvé pour cet utilisateur.");
    }

    // Vérifier si l'utilisateur a soumis son CV
    const cvSoumis = !!cv.cvCondidat;

    // Préparer la réponse
    const response = {
      cvSoumis,
      cvNom: cv.cvCondidat,
    };

    // Envoyer la réponse
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération du CV.");
  }
};
