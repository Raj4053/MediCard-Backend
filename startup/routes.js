const express = require('express');
const patients = require('../routes/patients');
const checkups = require('../routes/checkups');
const error = require('../middleware/error');
const cors = require('cors');

module.exports = function(app) {
    app.use(express.json());    //Reading JSON from req.body not allowed
    app.use(cors());
    app.use('/api/patients', patients);
    app.use('/api/checkups', checkups);
    app.use(error); //For Error Handling in Req-Res Cycle
}