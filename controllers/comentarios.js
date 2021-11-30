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
        .populate('autor')
        .then(resp => res.status(200).json(resp))
}

const añadirComentario = async (req, res = response) => {
    const { contenido, autor, articulo, discusion } = req.body;

    const creadoEn = new Date();

    const idDeAutor = db.Types.ObjectId(autor);
    const idDeArticulo = db.Types.ObjectId(articulo);
    const idDeDiscusion = db.Types.ObjectId(discusion);

    // Generar la data a guardar
    const data = {
        contenido,
        creadoEn,
        autor: idDeAutor,
        articulo: idDeArticulo,
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