Patient = require("../model/models");

/*
    Protocol: POST
    Route: /patients/:patient_id/history
    input: MedicalHistory
    output: Patient (with id's)
*/
exports.post = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    patient.history.push(req.body);
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
    Route: /patients/:patient_id/history/:history_id
    input: MedicalHistory
    output: Patient
*/
exports.put = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    let history = patient.history.id(req.params.history_id);
    history.date = req.body.date;
    history.diagnosis = req.body.diagnosis;
    history.diagnoser = req.body.diagnoser;
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
    Route: /patients/:patient_id/history/:history_id
    input: 
    output:
*/
exports.delete = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    patient.history.id(req.params.history_id).remove();
    patient.save(function(err) {
      if (err) res.json(err);
      res.json({
        status: "success",
        data: patient
      });
    });
  });
};
