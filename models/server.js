const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            articulos: '/api/articulos',
            uploads: '/api/uploads',
            jwt: '/api/validar-jwt',
            blog: '/api/blog',
        }

        // Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.articulos, require('../routes/articulos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.jwt, require('../routes/validar-jwt'));
        this.app.use(this.paths.blog, require('../routes/blogs'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;