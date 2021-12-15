const { Router } = require('express');
const { check } = require('express-validator');
// SDK de Mercado Pago
const mercadopago = require('mercadopago');

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

// Lo que tenga que ver con Mercado Paago
router.post('/checkout', (req, res) => {
    // Agrega credenciales
    mercadopago.configure({
        access_token: process.env.ACCESS_TOKEN
    });


    // Crea un objeto de preferencia
    let preference = {
        back_urls: {
            "success": "http://localhost:5500/public/auth.html",
            "failure": "http://localhost:5500/public/failure.html",
        },
        auto_return: "approved",
        items: [
            {
                title: 'Versión Premium de Blogi',
                description: 'La versión Premium de Blogi te permite tener más funciones a tu alcance',
                picture_url: 'https://blogi-node.herokuapp.com/img/logo.png',
                unit_price: 150,
                quantity: 1,
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(response => {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            global.id = response.body.id;
            res.json(response.body.id)
        })
        .catch(error => {
            console.log(error);
        });


})

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