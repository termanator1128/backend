let router = require("express").Router();
var patientController = require("../controllers/patientController");
var rxController = require("../controllers/rxController");
var historyController = require("../controllers/historyController");
var allergyController = require("../controllers/allergyController");

router
  .route("/patients")
  .get(patientController.index)
  .post(patientController.post);
router
  .route("/patients/:patient_id")
  .get(patientController.get)
  .put(patientController.put)
  .delete(patientController.delete);

router.route("/patients/:patient_id/scripts").post(rxController.post);

router
  .route("/patients/:patient_id/scripts/:script_id")
  .put(rxController.put)
  .delete(rxController.delete);

router.route("/patients/:patient_id/history").post(historyController.post);

router
  .route("/patients/:patient_id/history/:history_id")
  .put(historyController.put)
  .delete(historyController.delete);

router.route("/patients/:patient_id/allergies").post(allergyController.post);

router
  .route("/patients/:patient_id/allergies/:allergy_id")
  .put(allergyController.put)
  .delete(allergyController.delete);

module.exports = router;
