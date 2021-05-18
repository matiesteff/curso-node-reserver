
const { Router} = require ('express');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
 } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

//el :id es el nombre de la var q yo quiero obtener de la url
router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.post('/',usuariosPost);

router.delete('/', usuariosDelete );




module.exports = router;