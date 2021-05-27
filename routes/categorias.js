const { Router, response} = require ('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerUnaCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoria, existeUsuarioPorId, existeNombreCategoria } = require('../helpers/db-calidators');


const { validarJWT, validarCampos, esAdminRol } = require('../middelwares');






const router = Router();


//{{url}}/api/categorias
//obtener todas las categorias - publico
router.get('/', obtenerCategorias);



//obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID de mongo valido').isMongoId(),
   check('id').custom(c=>existeCategoria(c)),//sacar el valor que viene en el link
   validarCampos


],obtenerUnaCategoria);



//crear  categoria - privado, cualquier persona con un token valido
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], crearCategoria);



//Actualizar una categria por id - privado, cuaquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    //check('nombre').custom(existeNombreCategoria),
    validarCampos

], actualizarCategoria);




//Borrar una categoria- si es admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    
    check('id', 'No es un ID de mongo valido').isMongoId(),
    validarCampos
],eliminarCategoria);









module.exports = router;