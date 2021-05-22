const { Router} = require ('express');
const { check } = require('express-validator');


const { login } = require('../controllers/auth');
const { validarCampos } = require('../middelwares/validar-campos');


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatorioa').not().isEmpty(),
    validarCampos
], login);





module.exports = router;