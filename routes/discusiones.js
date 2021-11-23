const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarDiscusiones, mostrarDiscusion, modificarDiscusion, eliminarDiscusion } = require('../controllers/discusion');

const { validarJWT } = require('../helpers/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const app = Router();


app.get('/', mostrarDiscusiones);

app.get('/:id', mostrarDiscusion);

app.post('/', [
    validarJWT,
    check('titulo', 'Es obligatorio poner un titulo'),
    check('contenido', 'Es obligatorio tener un contenido'),
    validarCampos
], añadirDiscusion)

app.put('/:id', validarJWT, modificarDiscusion);

app.delete('/:id', validarJWT, eliminarDiscusion);



module.exports = app;