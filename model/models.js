var mongoose = require("mongoose");

var infoSchema = mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  pronouns: String,
  dob: String,
  address: String
});

var scriptSchema = mongoose.Schema({
  id: Number,
  date: String,
  drug: String,
  dosage: String,
  reason: String,
  prescriber: String
});

var historySchema = mongoose.Schema({
  id: Number,
  date: String,
  diagnosis: String,
  diagnoser: String
});

var allergySchema = mongoose.Schema({
  id: Number,
  allergy: String,
  reaction: String,
  severity: String
});

var patientSchema = mongoose.Schema({
  id: Number,
  notes: String,
  info: infoSchema,
  scripts: [scriptSchema],
  history: [historySchema],
  allergies: [allergySchema]
});

// Export Contact model
var Patient = (module.exports = mongoose.model("patient", patientSchema));
module.exports.get = function(callback, limit) {
  Patient.find(callback).limit(limit);
};
