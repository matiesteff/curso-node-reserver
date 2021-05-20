
const { Router} = require ('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middelwares/validar-campos');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
 } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-calidators');

const router = Router();

router.get('/', usuariosGet);

//el :id es el nombre de la var q yo quiero obtener de la url
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.post('/',  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password no es valido y mas de 6 caracteres').isLength({min: 6}),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( esRolValido),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );




module.exports = router;