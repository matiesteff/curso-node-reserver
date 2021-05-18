const express = require('express');
const cors = require('cors');


class Server{
    constructor(){

        this.app = express();
        this.port =process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        //middlewares
        this.middelwares();
        //Lectura y parceo del body

        this.app.use(express.json());



        //Rutas de mi aplicacion
        this.routes();
    }


    middelwares(){

        //CORS
        this.app.use(cors());

        //directorio publico
        this.app.use( express.static('public'));

    }

    routes(){
        
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'));

    }

    listen(){
        this.app.listen(this.port, () =>{

            console.log('Servidor corriendo en el puerto ', this.port)
        });
    }

}

module.exports = Server;