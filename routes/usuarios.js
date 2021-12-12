const { Router } = require('express');
const { check } = require('express-validator');
const stripe = require('stripe')('sk_test_51HoYNIKJ7A3qhuPfNldrNYLN2m5Fh0tGOnRDqn1gtCqsCOTPfRZhtWbl2Dpvp3hAsmkakpYEaMf2k3IE0FF2V64O00Q1yFcts7')


const { mostrarUsuarios, agregarUsuario, modificarUsuario, eliminarUsuario, mostrarUsuario, obtenerIDSUsuario, mostrarPerPage } = require('../controllers/usuario');

const { existeEmail, existeUsuarioPorID, esAdminRole } = require('../helpers/db-validators');
const { validarJWT } = require('../helpers/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();



router.get('/', mostrarUsuarios);

router.post('/page', mostrarPerPage);

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
    validarCampos
], agregarUsuario);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeUsuarioPorID),
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