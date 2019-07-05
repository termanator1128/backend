/*
    Protocol: POST
    Route: /patients/:patient_id/allergies
    input: Allergy
    output: Patient (with id's)
*/
exports.post = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    patient.allergies.push(req.body);
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
    Route: /patients/:patient_id/allergies/:allergy_id
    input: Allergy
    output: Patient
*/
exports.put = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    let allergy = patient.allergies.id(req.params.allergy_id);
    allergy.allergy = req.body.allergy;
    allergy.reaction = req.body.reaction;
    allergy.severity = req.body.severity;
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
    Route: /patients/:patient_id/allergies/:allergy_id
    input: 
    output:
*/
exports.delete = function(req, res) {
  Patient.findById(req.params.patient_id, function(err, patient) {
    if (err) res.send(err);
    patient.allergies.id(req.params.allergy_id).remove();
    patient.save(function(err) {
      if (err) res.json(err);
      res.json({
        status: "success",
        data: patient
      });
    });
  });
};
