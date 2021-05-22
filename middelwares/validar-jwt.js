//un middelwares es solo una simple funcion 
const { response, request } = require('express');


const jwt = require('jsonwebtoken');

const Usuario = require ('../models/usuario');

//next es para indicar a quien sea q este ejecuntando este middelware que puede continuar con el siguente middelware o siguente controlador 
const validarJWT = async (req = request, res = response, next)=>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg:'No hay un token en la peticion'
        });
    }
    

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existente en BD'
            })
        }

        //verificar si el usuario ya esta eliminado (estado en false)
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario con estado false, ya esta eliminado'
            })
        }

        req.uid = uid;
        req.usuario = usuario;


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }



}

module.exports = { validarJWT}




