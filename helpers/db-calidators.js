const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}


const emailExiste = async (correo = '') =>{

    const existeEmail = await Usuario.findOne ({correo});
    if (existeEmail) {
        throw new Error(`El correo: ${ correo} ya esta registrado`)
        
    }

}


const existeUsuarioPorId = async (id ) =>{

    const existeUsuario = await Usuario.findById (id);

    if (!existeUsuario) {
        throw new Error(`El id no existe: ${ correo}.`)
        
    }

}


const existeCategoria = async (id = '')=>{
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        console.log(' no existe esta categoria')
        throw new Error(`No existe una categoria para este ID: ${ id}.`)        
    }
}




const existeNombreCategoria = async(nombre = '')=>{
    const existeCat = await Categoria.findOne(nombre.toLocaleUpperCase());
    if (existeCat) {
        throw new Error(`Ya existe una categoria con este nombre: ${ nombre}.`)        
    }


}



const existeProducto = async (id)=>{
    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error(`No existe un Producto para este ID: ${ id}.`)        
    }
}




const existeNombreProducto = async(nombre = '')=>{
    const existePro = await Producto.findOne(nombre);
    if (existePro) {
        throw new Error(`Ya existe una categoria con este nombre: ${ nombre}.`)        
    }


}

//validar las colecciones permitidas para el subir archivo
const coleccionesPermitidas = (coleccion ='', colecciones = []) =>{
    const uncluida = colecciones.includes(coleccion);
    if (!uncluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }
    return true;

}






module.exports={
    esRolValido, 
    emailExiste, 
    existeUsuarioPorId,
    existeCategoria,
    existeNombreCategoria,
    existeProducto,
    existeNombreProducto,
    coleccionesPermitidas
}
