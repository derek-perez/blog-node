const { Router } = require('express');
const { check } = require('express-validator');
const { mostrarBlogs, añadirBlog, mostrarBlog, mostrarBlogDeUsuario, eliminarBlog } = require('../controllers/blogs');
const { existeUsuarioPorID } = require('../helpers/db-validators');
const { validarJWT } = require('../helpers/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', mostrarBlogs);

router.get('/:id', mostrarBlog);

router.get('/usuario/:id', mostrarBlogDeUsuario);

router.post('/', [
    validarJWT,
    check('titulo', 'El título es obligatorio'),
    check('autor').custom(existeUsuarioPorID),
    validarCampos
], añadirBlog);

router.delete('/:id', [
    validarJWT,
], eliminarBlog);


module.exports = router;