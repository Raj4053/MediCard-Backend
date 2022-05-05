const {createLogger, transports} = require('winston');
require('winston-mongodb');

const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'combined.log' }),
      new transports.MongoDB({ 
         db: 'mongodb://localhost/vidly',
         options: {useUnifiedTopology: true},
         metaKey: 'meta'
      })
    ],
});

module.exports = function(err, req, res, next) {
    //Logging The Exception
    logger.error({message: err.message, level: err.level, stack: err.stack, meta: err});

    res.status(500).send('Something Failed');
}