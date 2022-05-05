require('express-async-errors');
const {createLogger, transports} = require('winston');

module.exports = function() {
    const logger = createLogger({
        exceptionHandlers: [
            new transports.Console(),
            new transports.File({filename: 'exceptions.log'}),
        ],
        rejectionHandlers: [
            new transports.Console(),
            new transports.File({filename: 'rejections.log'})
        ]
    });
}