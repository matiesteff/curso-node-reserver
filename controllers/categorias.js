const { response, request } = require("express");
const { Categoria} = require('../models');
const { usuariosGet } = require("./usuarios");



//obtener categorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) =>{

    const {limite = 5, desde = 0} = req.query;


    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({estado :true}), //esta es otra solicitud a usuarios que seria el count total
        Categoria.find({estado :true})
        .skip(Number(desde))
        .limit(Number(limite))//esta es una solicitud a la base de datps que seria el const usuarios
            //se hace asi con el Promise.all xq al ser los 2 await se puede tardar 3 seg uno y 3 seg el otro entonces me duraria 6 segundos una sola funcion
        //ejecuta ambas promesas en simultaneo
        .populate('usuario', 'nombre')
      ])


      res.json({
      
        total, 
        categorias
      });

}



//obtener categoria -  populate{}

const obtenerUnaCategoria = async (req = request, res = response)=>{
   console.log(req.params);
    const {id} = req.params;
    const categoria = await Categoria.findById(id)
    .populate('usuario', 'nombre');

    return res.json(categoria);

}






const crearCategoria = async (req, res = response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data= {
        nombre,
        usuario: req.usuario._id 
    }

    const categoria = new Categoria (data);

    //GUARDAR EN BD
    await categoria.save();

    res.status(201).json(categoria);


}




//Actualizar categoria
const actualizarCategoria = async (req, res = response) =>{

    try {
        
        const {id} = req.params;
        const {estado, usuario, ...data} = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.uid;
        const catActualizada = await Categoria.findByIdAndUpdate(id, data).populate('usuario', 'nombre');
    
        res.json(catActualizada);
    } catch (error) {
        console.log(error);
    }

}



//Borrar categoria - estado:false

const eliminarCategoria = async (req, res = response)=>{

    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false})


    res.json(categoria);
}





module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerUnaCategoria,
    actualizarCategoria,
    eliminarCategoria
}
