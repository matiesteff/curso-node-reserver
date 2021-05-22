const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) =>{

    const {correo, password} = req.body;


    try {
        
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'PAssword no es correcto - estado'
            });
        }


        //verificar la contrasenia
        const validarPass = bcryptjs.compareSync(password, usuario.password)
        if (!validarPass) {
            return res.status(400).json({
                msg:'PAssword no es correcto - password'
            });
        }
        
        //Generar el JWT
        const token = await generarJWT(usuario.id)



        res.json({
            usuario, token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }




}

module.exports = {
    login
}
