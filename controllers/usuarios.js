
  const {response, request} = require('express');
  const Usuario = require('../models/usuario');
  const bcryptjs = require('bcryptjs');

  const usuariosGet = async(req = request, res = response) => {
    //const {q, nombre,apellido = 'No apellido', page, limit=10} = req.query;//para traer los datos desp del signo de ? de la URL
    const {limite = 5, desde = 0} = req.query;
    /*const usuarios = await Usuario.find({estado :true})
    .skip(Number(desde))
    .limit(Number(limite));

    const total = await Usuario.countDocuments({estado :true});
estas 2 consultas a la BD se hacen en el Promice.All
    */
   
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({estado :true}), //esta es otra solicitud a usuarios que seria el count total
       Usuario.find({estado :true})
      .skip(Number(desde))
      .limit(Number(limite))//esta es una solicitud a la base de datps que seria el const usuarios
          //se hace asi con el Promise.all xq al ser los 2 await se puede tardar 3 seg uno y 3 seg el otro entonces me duraria 6 segundos una sola funcion
      //ejecuta ambas promesas en simultaneo
    ])

    res.json({
      
      total, 
      usuarios
    });
  }

  const usuariosPost = async (req, res) => { 

    const {nombre, correo, password, rol} = req.body;// si quiero sacar uno en especifco 
    //y tener el resto en otra var, seria const {nombre ... resto} = body
    const usuario = new Usuario( {nombre, correo, password, rol});
    
    //verificar si el correo existe
    


    //encriptaar la contrasenia
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt);



    //guardar en BD
    await usuario.save();

    res.status(201).json({
        usuario
    });
}    


  const usuariosPut =  async(req, res = response) => {
    const { id} = req.params;//obtener el dato de la URL
    const {_id, password, google, correo, ...resto} = req.body;

    //Validar contra base de datos
    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);



    res.status(201).json({
        msg:'put API - controlador',
        usuarioDB
    });
  }


  const usuariosPatch =  (req, res = response) => {
    res.status(201).json({
        msg:'patch API - controlador'
    });
  }


  const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    
    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    //Cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});
    const usuarioAutenticado = req.usuario;



    res.json({
        usuario, 
        usuarioAutenticado
    });
  }




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}