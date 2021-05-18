
  const {response, request} = require('express');
  
  const usuariosGet = (req = request, res = response) => {
    const {q, nombre,apellido = 'No apellido', page, limit=10} = req.query;//para traer los datos desp del signo de ? de la URL
    
    res.status(201).json({
        msg:'get API - controlador',
        q, nombre,apellido, page, limit
    });
  }

  const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body;

    res.status(201).json({
        msg:'post API - controlador',
        nombre, edad
    });
}    


  const usuariosPut = (req, res = response) => {
    const { id} = req.params;//obtener el dato de la URL
    
    res.status(201).json({
        msg:'put API - controlador',
        id
    });
  }


  const usuariosPatch =  (req, res = response) => {
    res.status(201).json({
        msg:'patch API - controlador'
    });
  }


  const usuariosDelete = (req, res = response) => {
    res.status(201).json({
        msg:'Delete API - controlador'
    });
  }




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}