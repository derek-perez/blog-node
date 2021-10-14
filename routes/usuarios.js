const { Router } = require('express');
const { check } = require('express-validator');

const { mostrarUsuarios, agregarUsuario, modificarUsuario, eliminarUsuario, mostrarUsuario } = require('../controllers/usuario');

const { existeEmail, existeUsuarioPorID, esAdminRole } = require('../helpers/db-validators');
const { validarJWT } = require('../helpers/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();



router.get('/', mostrarUsuarios);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], mostrarUsuario);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], agregarUsuario);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeUsuarioPorID),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], modificarUsuario);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], eliminarUsuario);



module.exports = router;