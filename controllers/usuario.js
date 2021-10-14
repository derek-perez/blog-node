const { response } = require("express");
const bcryptjs = require('bcryptjs');

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

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la DB
    await usuario.save();

    res.json({
        usuario
    });
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