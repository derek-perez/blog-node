const { response } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const verificarJWTController = async (req, res = response) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario que correspnde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'token no válido - no existe en DB'
            });
        }

        // Verificar si el usuario está en estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'token no válido - usuario con estado: false'
            });
        }

        req.usuario = usuario;
        return res.status(200).json({
            msg: 'Token válido',
            token
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}


module.exports = verificarJWTController;