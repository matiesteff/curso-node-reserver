const { response, request } = require("express")


const esAdminRol = (req= request, res = response, next) =>{
    if (!req.usuario) {
        return res.status(500).json(({
            msg: 'Se quiere verificar el rol sin calidar el token primero'
        }));
    }
    const {rol, nombre }= req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(500).json(({
            msg: `${nombre} no es administradir, no puede hacer esto`
        }));
    }



    next();
}

const tieneRol = (...roles) =>{

    

    return (req= request, res = response, next)=>{

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }
       
        next();
    }
}


module.exports={
    esAdminRol,
    tieneRol
}




