const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleverify } = require("../helpers/google-verify");

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


const googleSignin = async( req = request, res = response)=>{

    const{id_token} = req.body;

    try {
    const {correo, nombre, img} = await googleverify(id_token);
    
    
    let usuario = await Usuario.findOne({correo});
    console.log('pppp', usuario, correo, nombre, img);

    if ( !usuario ) {
        // Tengo que crearlo
        const data = {
            nombre,
            correo,
            password: ':P',
            img,
            google: true
        };

        usuario = new Usuario( data );
        await usuario.save();
    }

    // Si el usuario en DB
    if ( !usuario.estado ) {
        return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado'
        });
    }

    // Generar el JWT
    const token = await generarJWT( usuario.id );
    
    res.json({
        usuario,
        token
    });
    } catch (error) {
        res.status(400).json({
            error,
            msg:'Token de google no es valido'
        })
    }


}

module.exports = {
    login,
    googleSignin
}
