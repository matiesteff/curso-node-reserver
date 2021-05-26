const { response, request } = require("express");
const { Producto} = require('../models');




const crearProducto = async (req, res = response)=>{

    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre:body.nombre.toUpperCase()});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data= {        
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto (data);

    //GUARDAR EN BD
    await producto.save();

    res.status(201).json(producto);

}

const obtenerProductos = async (req, res = response)=>{

    const {limite = 5, desde = 0} = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({estado :true}), //esta es otra solicitud a usuarios que seria el count total
        Producto.find({estado :true})
        .skip(Number(desde))
        .limit(Number(limite))//esta es una solicitud a la base de datps que seria el const usuarios
            //se hace asi con el Promise.all xq al ser los 2 await se puede tardar 3 seg uno y 3 seg el otro entonces me duraria 6 segundos una sola funcion
        //ejecuta ambas promesas en simultaneo
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
      ])


      res.json({
      
        total, 
        productos
      });
}

const obtenerUnProducto = async (req, res = response) =>{

    const {id} = req.params;

    const prod = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

    res.json(prod);
}


const actualizarProducto = async (req, res = response)=>{

    const {estado, usuario, ...body} = req.body;
    const {id} = req.params;

    const productoDB = await Producto.findOne({nombre:body.nombre.toUpperCase()});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data= {        
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }


    //GUARDAR EN BD
    console.log(id);
    const prod = await Producto.findByIdAndUpdate(id, data).populate('usuario', 'nombre').populate('categoria', 'nombre');;
    console.log(prod);
    res.status(201).json(prod);
}


const eliminarProducto = async (req, res = response)=>{

    const {id} = req.params;

    try {
        
        const prod = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})

        res.status(201).json(prod);
    } catch (error) {
        
    }


}






module.exports ={
    crearProducto,
    obtenerProductos,
    obtenerUnProducto,
    actualizarProducto,
    eliminarProducto
}

