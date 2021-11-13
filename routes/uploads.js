const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary, subirImg } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');


const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo);

router.post('/subir', subirImg);

router.put('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'articulos', 'imgDentroDeArticulos'])),
    validarCampos
], actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'articulos', 'imgDentroDeArticulos'])),
    validarCampos
], mostrarImagen)



module.exports = router;