const { Router, response} = require ('express');
const { check } = require('express-validator');

const { crearProducto, 
    obtenerProductos, 
    obtenerUnProducto, 
    actualizarProducto, 
    eliminarProducto} = require('../controllers/productos');
const { existeCategoria,existeNombreProducto, existeProducto } = require('../helpers/db-calidators');


const { validarJWT, validarCampos, esAdminRol } = require('../middelwares');


const router = Router();


//{{url}}/api/productos
//obtener todos los productos - publico
router.get('/', obtenerProductos);



//crear un producto - privado, cualquier persona con un token valido
router.post('/', [
        validarJWT,
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        check('categoria', 'No es un Id de mongo valido').isMongoId(),
        check('categoria').custom(existeCategoria),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        //check('nombre').custom(existeNombreProducto),
        validarCampos
    ], crearProducto);




//obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos    
    
],obtenerUnProducto);

    
//Actualizar un producto por id - privado, cuaquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProducto),
    //check('nombre').custom(existeNombreCategoria),
    validarCampos

], actualizarProducto);

    
    

//Borrar un producto- si es admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,    
    check('id', 'No es un ID de mongo valido').isMongoId(),
    validarCampos
],eliminarProducto);








module.exports = router;



