const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarComentarios, mostrarComentarioDeArticulo, mostrarComentarioDeDiscusion, añadirComentario } = require('../controllers/comentarios');

const { validarJWT } = require('../helpers/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const app = Router();


app.get('/', mostrarComentarios);

app.get('/articulo/:id', mostrarComentarioDeArticulo);

app.get('/discusion/:id', mostrarComentarioDeDiscusion);

app.post('/', [
    validarJWT,
    check('contenido', 'Es obligatorio tener un contenido'),
    validarCampos
], añadirComentario);



module.exports = app;