const boom = require('@hapi/boom')

function validate(data, schema){
    const {error} = schema.validate(data,{error:{stack: true}})
    return error
}

function validationHandler(schema, check="body", param=''){
    return function(req, res, next){
        

        if(param){
            const objectParam = req.params.param
            console.log(objectParam); //eslint-disable-line
            const error = validate(objectParam, schema)
            error ? next(boom.badRequest(error)) : next()

        }else{
            const error = validate(req[check], schema)
            error ? next(boom.badRequest(error)) : next()
        }


    }
}

module.exports = validationHandler