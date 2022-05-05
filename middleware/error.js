const {createLogger, transports} = require('winston');

const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'combined.log' }),
    ],
});

module.exports = function(err, req, res, next) {
    //Logging The Exception
    logger.error({message: err.message, level: err.level, stack: err.stack, meta: err});

    res.status(500).send('Something Failed');
}