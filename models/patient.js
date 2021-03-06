const Joi = require('joi');
const mongoose = require('mongoose');

const Patient = mongoose.model('Patient', new mongoose.Schema({
    //Personal Data
    name: { //Can be split into First, Middle and Last
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    }, 
    dob: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        length: 1
    },
    phone: {
        type: String,
        required: true,
        length: 10
    },

    //Genral Data
    bloodGroup: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 3
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}));

function validatePatient(patient) {
    const schema = Joi.object({
        //Personal Data
        name: Joi.string().min(3).max(20).required(), 
        dob: Joi.date().required(),
        sex: Joi.string().required(),
        phone: Joi.string().length(10).required(),

        //Genral Data
        bloodGroup: Joi.string().required(),
        height: Joi.number().required(),
        weight: Joi.number().required(),
    });

    return schema.validate(patient);
}

exports.Patient = Patient;
exports.validate = validatePatient;