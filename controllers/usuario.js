const { response } = require("express");
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');
const Articulo = require("../models/articulo");
const Blog = require("../models/blog");

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

    // Obtener usuario
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    // Obtener blog(s) del usuario
    const blog = await Blog.find({ autor: id });

    // Extrae los articulos que ha hecho el usuario
    const condicion = { public: true, autor: id }
    await Articulo.paginate(condicion, { populate: 'categoria', limit: 6 })
        .then(resp => {
            return res.status(200).json({
                resp,
                usuario,
                blog
            })
        })
        .catch(console.log)

}

const agregarUsuario = async (req, res = response) => {

    try {

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

                    return res.json({
                        usuario,
                        token
                    });
                })
        }

        nuevoUsuario();

    } catch (error) {
        console.log(error)
    }
}

const modificarUsuario = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, rol, estado, ...resto } = req.body;

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

const mostrarPerPage = async (req, res = response) => {
    const { page, id } = req.body;

    const condicion = { estado: true, autor: id }
    await Articulo.paginate(condicion, { populate: 'categoria', page, limit: 6 })
        .then(resp => {
            return res.status(200).json({
                resp
            })
        })
        .catch(console.log)
}




module.exports = {
    mostrarUsuarios,
    mostrarUsuario,
    agregarUsuario,
    modificarUsuario,
    eliminarUsuario,
    mostrarPerPage
}