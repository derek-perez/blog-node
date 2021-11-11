const { Router } = require('express');
const { check } = require('express-validator');

const { mostrarArticulos, mostrarArticulo, añadirArticulo, editarArticulo, eliminarArticulo, mostrarArticulosDeUsuario, mostrarUltimos3, mostrarArticulosDeBlog } = require('../controllers/articulo');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');

const { existeArticuloPorID, esAdminRole, existeUsuarioPorID, existeCategoriaPorID } = require('../helpers/db-validators');

const router = Router();


router.get('/', mostrarArticulos);

router.get('/ultimos', mostrarUltimos3);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeArticuloPorID),
    validarCampos
], mostrarArticulo);

router.get('/usuario/:usuario', [
    check('usuario', 'No es un ID de Mongo válido').isMongoId(),
    check('usuario').custom(existeUsuarioPorID),
    validarCampos
], mostrarArticulosDeUsuario);

router.get('/blog/:blog', [
    check('blog', 'No es un ID de Mongo válido').isMongoId(),
    validarCampos
], mostrarArticulosDeBlog);

router.post('/', [
    validarJWT,
    check('categoria', 'No es un ID de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    check('blog', 'El Blog es obligatorio').not().isEmpty(),
    check('textarea', 'El textarea es obligatorio').not().isEmpty(),
    validarCampos
], añadirArticulo);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeArticuloPorID),
    validarCampos
], editarArticulo);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeArticuloPorID),
    validarCampos
], eliminarArticulo);



module.exports = router;