const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {Producto, Usuario, Categoria} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];


const buscarUsuarios = async (termino = '' , res = response)=>{

    const esMongoID = ObjectId.isValid(termino); //true

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario)? [usuario]:[]
        })
    }

    //esto es para que busque si contiene algun caracter y no si empieza asi, ni tampoco que sea key sensitive
    const regExp = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({
        $or :[{nombre:regExp}, {correo:regExp}],
        $and:[{estado:true}]
    })
    
    res.json({
        results: usuarios
    })
}


const buscarCategorias = async (termino = '' , res = response)=>{

    const esMongoID = ObjectId.isValid(termino); //true

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria)? [categoria]:[]
        })
    }

    //esto es para que busque si contiene algun caracter y no si empieza asi, ni tampoco que sea key sensitive
    const regExp = new RegExp( termino, 'i');

    const categorias = await Categoria.find(
        {nombre:regExp , estado:true}
    )
    
    res.json({
        results: categorias
    })
}


const buscarProductos = async (termino = '' , res = response)=>{

    const esMongoID = ObjectId.isValid(termino); //true

    if (esMongoID) {
        const producto = await Producto.findById(termino)
        .populate('categoria', 'nombre');
        return res.json({
            results: (producto)? [producto]:[]
        })
    }

    //esto es para que busque si contiene algun caracter y no si empieza asi, ni tampoco que sea key sensitive
    const regExp = new RegExp( termino, 'i');

    const productos = await Producto.find(
        {nombre:regExp , estado:true}
    ).populate('categoria', 'nombre');
    
    res.json({
        results: productos
    })
}




const buscar =( req, res = response) =>{

    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios' :
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
/*
    res.status(500).json({
        coleccion, termino
    })
*/
}


module.exports ={

    buscar

}


