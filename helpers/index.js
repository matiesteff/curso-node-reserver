
const dbCalidators = require('./db-calidators')
const generarJWT = require('./generar-jwt')
const googleVerify = require('./google-verify')
const subirArchivo = require('./subir-archivo')


module.exports= {

    ...dbCalidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
    
}

