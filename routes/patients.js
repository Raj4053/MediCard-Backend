const { Patient, validate } = require("../models/patient");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //Validate Req.body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let patient = await Patient.findOne({ phone: req.body.phone });
  if (patient) return res.status(400).send("Patient already registered.");

  //Creating the Patient
  patient = new Patient(
    _.pick(req.body, [
      "name",
      "dob",
      "sex",
      "phone",
      "bloodType",
      "height",
      "weight",
      "bmi",
    ])
  );

  await patient.save();
  console.log(patient);

  res.send(_.pick(patient, "name", "_id", "phone", "bloodTye"));
});

router.get("/:id", async (req, res) => {
  //Fetching Patient from DB
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).send("Patient not found.");

  res.send(patient);
});

module.exports = router;
