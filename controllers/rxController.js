Patient = require("../model/models");
/*
    Protocol: POST
    Route: /patients/:patient_id/scripts
    input: Rx
    output: Patient (with id's)
*/
exports.post = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    patient.scripts.push(req.body);
    patient.save(function(err) {
      if (err) res.json(err);
      res.json({
        status: "success",
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
    if (err) res.send(err);
    let rx = patient.scripts.id(req.params.script_id);
    rx.date = req.body.date;
    rx.drug = req.body.drug;
    rx.dosage = req.body.dosage;
    rx.reason = req.body.reason;
    rx.prescriber = req.body.prescriber;
    patient.save(function(err) {
      if (err) res.json(err);
      res.json({
        status: "success",
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
    if (err) res.send(err);
    patient.scripts.id(req.params.script_id).remove();
    patient.save(function(err) {
      if (err) res.json(err);
      res.json({
        status: "success",
        data: patient
      });
    });
  });
};
