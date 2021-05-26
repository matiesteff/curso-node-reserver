const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{
    constructor(){

        this.app = express();
        this.port =process.env.PORT;

        this.paths = {
            auth:'/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios'
        }
        //seria lo mismo que lo de arriba pero en una linea
        //this.usuariosRoutePath = '/api/usuarios';
        //this.authPath = '/api/auth';

        //Conectar a BD
        this.conectarDB();


        //middlewares
        this.middelwares();

        //Lectura y parceo del body
        this.app.use(express.json());



        //Rutas de mi aplicacion
        this.routes();
    }


    async conectarDB (){
        await dbConnection();

    }

    middelwares(){

        //CORS
        this.app.use(cors());

        //directorio publico
        this.app.use( express.static('public'));

    }

    routes(){
        
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{

            console.log('Servidor corriendo en el puerto ', this.port)
        });
    }

}

module.exports = Server;