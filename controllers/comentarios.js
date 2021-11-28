const db = require('mongoose');
const { response } = require('express');

const Discusion = require('../models/discusion');
const Articulo = require('../models/articulo');
const Comentario = require('../models/comentario');

const mostrarComentarios = async (req, res = response) => {
    await Comentario.find()
        .then(resp => res.status(200).json({ resp }))
}

const mostrarComentarioDeArticulo = async (req, res = response) => {
    const { id } = req.params;

    await Comentario.find({ articulo: id })
        .then(resp => res.status(200).json({ resp }))
}

const mostrarComentarioDeDiscusion = async (req, res = response) => {
    const { id } = req.params;

    await Comentario.find({ discusion: id })
        .then(resp => res.status(200).json({ resp }))
}

const añadirComentario = async (req, res = response) => {
    const { contenido, autor, categoria, discusion } = req.body;

    const comentarioDB = await Comentario.findOne({ titulo });

    if (comentarioDB) {
        return res.status(400).json({
            msg: `Ya hay una discusión con el mismo titulo`
        });
    }

    const creadoEn = new Date();

    const idDeAutor = db.Types.ObjectId(autor);
    const idDeCtg = db.Types.ObjectId(categoria);
    const idDeDiscusion = db.Types.ObjectId(discusion);

    // Generar la data a guardar
    const data = {
        contenido,
        creadoEn,
        autor: idDeAutor,
        categoria: idDeCtg,
        discusion: idDeDiscusion,
    }

    const comentario = new Comentario(data);

    // Guardar DB
    await comentario.save();

    res.status(200).json(comentario);
}


module.exports = {
    mostrarComentarios,
    mostrarComentarioDeArticulo,
    mostrarComentarioDeDiscusion,
    añadirComentario,
}