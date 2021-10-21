const { Router } = require('express');

const verificarJWTController = require('../controllers/validarJWTController');

const router = Router();

router.get('/', verificarJWTController);



module.exports = router;