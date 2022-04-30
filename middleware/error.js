
module.exports = function(err, req, res, next) {
    //Logging The Exception
    console.log({message: err.message, level: err.level, stack: err.stack, meta: err});

    res.status(500).send('Something Failed');
}