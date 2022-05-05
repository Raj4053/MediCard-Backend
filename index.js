const express = require("express")
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();  
require('./startup/prod')(app);

//To get port from environment variable
const port = process.env.PORT || 3000;

//Listening on Port 
const server = app.listen(port, () => console.log(`Listening on Port: ${port}`));

module.exports = server;