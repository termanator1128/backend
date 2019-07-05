Patient = require("../model/models");
/*
    Protocol: GET
    Route: /patients/
    input: 
    output: Patient[]
*/
exports.index = function(req, res) {
  Patient.get(function(err, patients) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Patients retrieved successfully",
      data: patients
    });
  });
};

/*
    Protocol: POST
    Route: /patients/
    input: Patient
    output: Patient (with id's)
*/
exports.post = function(req, res) {
  var patient = new Patient();
  patient.notes = req.body.notes;
  patient.info = req.body.info;
  patient.scripts = req.body.scripts;
  patient.history = req.body.history;
  patient.allergies = req.body.allergies;

  patient.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New patient created!",
      data: patient
    });
  });
};

/*
    Protocol: GET
    Route: /patients/:patient_id/
    input: 
    output: Patient
*/
exports.get = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      data: patient
    });
  });
};

/*
    Protocol: PUT
    Route: /patients/:patient_id/
    input: Patient
    output: Patient
*/
exports.put = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    patient.notes = req.body.notes;
    patient.info = req.body.info;
    patient.scripts = req.body.scripts;
    patient.history = req.body.history;
    patient.allergies = req.body.allergies;
    patient.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Patient Info updated",
        data: patient
      });
    });
  });
};

/*
    Protocol: DEL
    Route: /patients/:patient_id/
    input: 
    output:
*/
exports.delete = function(req, res) {
  Patient.deleteOne({ _id: req.params.patient_id }, function(err) {
    if (err) res.send(err);
    res.json({
      status: "success",
      message: "Patient deleted"
    });
  });
};
