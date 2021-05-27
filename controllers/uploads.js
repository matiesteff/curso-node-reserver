const {subirArchivo} = require('../helpers');
const {Usuario, Producto} = require('../models')
const path = require('path')
const fs = require('fs')

var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require("express");
const { request } = require('http');
const { model } = require('mongoose');



const cargarArchivo = async (req, res = response)=>{
   
    try {
        
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        })
        
    } catch (msg) {
        res.status(400).json({msg})
    }
}


//esto es para hacerlo en el local host es decir guardar las img y todo en mi pc, el otro es para hacerlo en una CLoud
const actualizarImagen = async (req, res = response) =>{

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'No existe un usuario con ese id'
                })
            }

            break;
            
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'No existe un producto con ese id'           
                 })        
            }
            
            break;
            
            default:
                res.status(500).json({
                    msg:'se me olvido validar esto'
                })
            }

    //Limpiar imagenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }
            
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre
     
    await modelo.save();


    res.json(
        modelo
    )

}



const actualizarImagenCloudinary = async (req, res = response) =>{

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'No existe un usuario con ese id'
                })
            }

            break;
            
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'No existe un producto con ese id'           
                 })        
            }
            
            break;
            
            default:
                res.status(500).json({
                    msg:'se me olvido validar esto'
                })
            }

    //Limpiar imagenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        
        await cloudinary.uploader.destroy(public_id);
    }
            
    const {tempFilePath } = req.files.archivo;//saco el path temporal del archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)//se guarda el archivo en la cloud y agarro la URL de donde se guardo la IMG en la nube

    modelo.img = secure_url; 
     
    await modelo.save();


    res.json(
        modelo
    )

}















const mostrarImagen = async (req = request, res = response) =>{

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'No existe un usuario con ese id'
                })
            }

            break;
            
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'No existe un producto con ese id'           
                 })        
            }
            
            break;
            
            default:
                res.status(500).json({
                    msg:'se me olvido validar esto'
                })
            }

    //Limpiar imagenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }
               
    const pathNoImg = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(pathNoImg);
}






module.exports ={
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}