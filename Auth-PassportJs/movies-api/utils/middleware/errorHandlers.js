const {config} = require('../../config');
const boom = require('@hapi/boom')

function withErrorStack(error, stack){
    if(config.dev){
        return {...error, stack}
    }

    return error
}


function logErrors(err, req, res, next){
    console.log(err);   //eslint-disable-line
    next(err)
}


function wrapError(err, req, res, next){
    if(!err.isBoom){
        next(boom.badImplementation(err))
    }
}

function errorHandler(err, req, res, next){ //eslint-disable-line
    const {output: {statusCode, payload}} = err 

    res.status(statusCode || 500);
    res.json(withErrorStack(payload, err.stack))
}


module.exports = {
    wrapError,
    logErrors,
    errorHandler
}