const express = require('express')
const cors=require('cors')
const {dbConnection}=require('../database/config')

class Server{
    constructor(){
        this.app = express()
        this.port=process.env.PORT
        this.usuariosPath='/api/usuarios';
        
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //rutas
        this.routes();
        //Conectar a base de datos
       

    }
    async conectarDB(){
        await dbConnection()   
       }
    middlewares(){
        //CORS: quien puede ver la app
        this.app.use(cors());
        //Lectura y parseo del body


        this.app.use( express.json())
        //Directorio publico

        this.app.use(express.static('public'));
    }
        //Rutas de la aplicacion
       
    routes(){
       this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port)
        })
    }
}


module.exports=Server;