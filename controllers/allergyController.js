Patient = require("../model/models");

/*
    Protocol: POST
    Route: /patients/:patient_id/allergies
    input: Allergy
    output: Patient (with id's)
*/
exports.post = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) {
      next(err);
    }
    patient.allergies.push(req.body);
    patient.save(function(err) {
      if (err) {
        next(err);
      }
      res.json({
        success: true,
        message: "Allergy created succesfully",
        data: patient
      });
    });
  });
};

/*
    Protocol: PUT
    Route: /patients/:patient_id/allergies/:allergy_id
    input: Allergy
    output: Patient
*/
exports.put = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) {
      next(err);
    }
    let allergy = patient.allergies.id(req.params.allergy_id);
    allergy.allergy = req.body.allergy;
    allergy.reaction = req.body.reaction;
    allergy.severity = req.body.severity;
    patient.save(function(err) {
      if (err) {
        next(err);
      }
      res.json({
        success: true,
        message: "Allergy updated succesfully",
        data: patient
      });
    });
  });
};

/*
    Protocol: DEL
    Route: /patients/:patient_id/allergies/:allergy_id
    input: 
    output:
*/
exports.delete = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) {
      next(err);
    }
    patient.allergies.id(req.params.allergy_id).remove();
    patient.save(function(err) {
      if (err) {
        next(err);
      }
      res.json({
        success: true,
        message: "Allergy deleted succesfully",
        data: patient
      });
    });
  });
};
