const { Router } = require('express');
const { check } = require('express-validator');

const { mostrarCategorias, añadirCategorias, editarCategorias, eliminarCategorias, mostrarCategoria, mostrarArticulosDeCategoria, mostrarDiscusionesDeCategoria } = require('../controllers/categorias');

const { existeCategoriaPorID, esAdminRole } = require('../helpers/db-validators');
const { validarJWT } = require('../helpers/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/', mostrarCategorias);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], mostrarCategoria);

router.get('/articulos/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], mostrarArticulosDeCategoria);

router.get('/discusiones/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], mostrarDiscusionesDeCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos
], añadirCategorias);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], editarCategorias);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], eliminarCategorias);



module.exports = router;