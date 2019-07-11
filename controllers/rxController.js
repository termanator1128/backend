Patient = require("../model/models");
/*
    Protocol: POST
    Route: /patients/:patient_id/scripts
    input: Rx
    output: Patient (with id's)
*/
exports.post = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) {
      next(err);
    }
    patient.scripts.push(req.body);
    patient.save(function(err) {
      if (err) {
        next(err);
      }
      res.json({
        success: true,
        message: "Rx created succesfully",
        data: patient
      });
    });
  });
};

/*
    Protocol: PUT
    Route: /patients/:patient_id/scripts/:script_id
    input: Rx
    output: Patient
*/
exports.put = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) {
      next(err);
    }
    let rx = patient.scripts.id(req.params.script_id);
    rx.date = req.body.date;
    rx.drug = req.body.drug;
    rx.dosage = req.body.dosage;
    rx.reason = req.body.reason;
    rx.prescriber = req.body.prescriber;
    patient.save(function(err) {
      if (err) {
        next(err);
      }
      res.json({
        success: true,
        message: "Rx updated succesfully",
        data: patient
      });
    });
  });
};

/*
    Protocol: DEL
    Route: /patients/:patient_id/scripts/:script_id
    input: 
    output:
*/
exports.delete = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) {
      next(err);
    }
    patient.scripts.id(req.params.script_id).remove();
    patient.save(function(err) {
      if (err) {
        next(err);
      }
      res.json({
        success: true,
        message: "Rx deleted succesfully",
        data: patient
      });
    });
  });
};
