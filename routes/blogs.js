const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarBlogs, añadirBlog, mostrarBlog } = require('../controllers/blogs');
const { existeUsuarioPorID } = require('../helpers/db-validators');
const { validarJWT } = require('../helpers/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', mostrarBlog);

router.get('/:id', mostrarBlogs);

router.post('/', [
    validarJWT,
    check('titulo', 'El título es obligatorio'),
    check('autor').custom(existeUsuarioPorID),
    validarCampos
], añadirBlog);


module.exports = router;