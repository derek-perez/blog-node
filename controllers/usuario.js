const { response } = require("express");
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');
const Articulo = require("../models/articulo");

const mostrarUsuarios = async (req, res = response) => {
    const estado = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(estado),
        Usuario.find(estado)
    ]);

    res.json({
        total,
        usuarios
    });
}

const mostrarUsuario = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    const articulos = [];

    // Extrae los articulos que ha hecho el usuario
    const condicion = { estado: true, autor: id }
    const articulo = await Articulo.find(condicion)
        .then(a => {
            for (i in a) {
                articulos.push(a[i].titulo);
            }
        })

    res.json({
        usuario,
        articulos,
        articulos
    });

}

const agregarUsuario = async (req, res = response) => {

    const { nombre, correo, password } = req.body;
    const usuario = new Usuario({ nombre, correo, password });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la DB
    await usuario.save();

    // Generar el JWT
    const nuevoUsuario = () => {
        Usuario.find({ correo })
            .then(async user => {

                const idMal = user[0]._id;
                const idAString = idMal.toString();
                const id = idAString.split('"');

                const token = await generarJWT(id);

                res.json({
                    usuario,
                    token
                });
            })
    }

    nuevoUsuario();
}

const modificarUsuario = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json(usuario);
}

const eliminarUsuario = async (req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({ usuario });
}





module.exports = {
    mostrarUsuarios,
    mostrarUsuario,
    agregarUsuario,
    modificarUsuario,
    eliminarUsuario
}