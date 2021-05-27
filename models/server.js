const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{
    constructor(){

        this.app = express();
        this.port =process.env.PORT;

        this.paths = {
            auth:'/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios',
            uploads:'/api/uploads'
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

        //lectura y parceo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use( express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{

            console.log('Servidor corriendo en el puerto ', this.port)
        });
    }

}

module.exports = Server;