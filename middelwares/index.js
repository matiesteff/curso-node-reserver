// esto es para unificar las importaciones que estan en el middelware, al llamarse index, cuando yo indique ../middelware va a apuntar automaticamente al index.js

const validarCampos = require('../middelwares/validar-campos');
const validaRoles = require('../middelwares/validar-roles');
const  validarJWT  = require('../middelwares/validar-jwt');



module.exports={
    ...validarCampos,
    ...validaRoles,// esta contiene a tieneRol y esRolAdmin
    ...validarJWT

}