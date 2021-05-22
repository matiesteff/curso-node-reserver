
const { Router} = require ('express');
const { check } = require('express-validator');

//los comm=ente para unificar estas importaciones en un mismo archivo index en la carpeta dodne estan todos
//const { validarCampos} = require('../middelwares/validar-campos');
//const { esAdminRol, tieneRol } = require('../middelwares/validar-roles');
//const { validarJWT } = require('../middelwares/validar-jwt');
const {
    validarCampos,
    validarJWT,
    esAdminRol, tieneRol

} = require('../middelwares');



const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
 } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-calidators');

const router = Router();

router.get('/', usuariosGet);

//el :id es el nombre de la var q yo quiero obtener de la url y que tenga la URL
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

//el :id es el nombre de la var q yo quiero obtener de la url y que tenga la URL
router.delete('/:id',[
    validarJWT,
    //esAdminRoles, 
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );




module.exports = router;