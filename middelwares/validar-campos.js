//un middelwares es solo una simple funcion 
const { validationResult } = require('express-validator');

//next es para indicar a quien sea q este ejecuntando este middelware que puede continuar con el siguente middelware o siguente controlador
const validarCampos = ( req, res, next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}





module.exports = {validarCampos}


