const { Patient } = require("../models/patient");
const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateCheckup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let patient = await Patient.findById(req.body.id);
  if (!patient)
    return res.status(404).send("Patient with given Id is not found.");

  //Find Patient and Update it
  patient = await Patient.findByIdAndUpdate(
    req.body.id,
    { $set: _.pick(req.body, ["height", "weight"]) },
    { new: true }
  );

  res.send(patient);
});

function validateCheckup(req) {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
  });

  return schema.validate(req);
}

module.exports = router;
