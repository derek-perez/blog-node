const db = require('mongoose');
const { response } = require("express");

const Discusion = require('../models/discusion');

const mostrarDiscusiones = async (req, res = response) => {
    await Discusion.find()
        .populate('autor', 'nombre')
        .populate('categoria', 'nombre')
        .then(resp => res.status(200).json({ resp }))
}

const mostrarDiscusion = async (req, res = response) => {
    const { id } = req.params;

    await Discusion.find({ _id: id })
        .populate('autor', 'nombre')
        .populate('categoria', 'nombre')
        .then(resp => res.status(200).json({ resp }))
}

const añadirDiscusion = async (req, res = response) => {
    const { titulo, contenido, textoParaTarjetas, autor, categoria, comentarios } = req.body;

    const discusionDB = await Discusion.findOne({ titulo });

    if (discusionDB) {
        return res.status(400).json({
            msg: `Ya hay una discusión con el mismo titulo`
        });
    }

    const creadoEn = new Date();

    const idDeAutor = db.Types.ObjectId(autor);
    const idDeCtg = db.Types.ObjectId(categoria);
    const idDeComent = db.Types.ObjectId(comentarios);

    // Generar la data a guardar
    const data = {
        titulo,
        contenido,
        textoParaTarjetas,
        creadoEn,
        autor: idDeAutor,
        categoria: idDeCtg,
        comentario: idDeComent,
    }

    const discusion = new Discusion(data);

    // Guardar DB
    await discusion.save();

    res.status(200).json(discusion);
}

const modificarDiscusion = async (req, res = response) => {
    try {
        const { id } = req.params;
        const cambios = req.body;

        const discusionCambiado = await Discusion.findByIdAndUpdate(id, cambios, { new: true });

        res.status(200).json(discusionCambiado);

    } catch (error) {
        console.log(error)
    }
}

const eliminarDiscusion = async (req, res = response) => {
    const { id } = req.params;

    await Discusion.findByIdAndDelete(id)

    res.status(200).json({ msg: 'Discusion eliminado correctamente' })
}


module.exports = {
    mostrarDiscusiones,
    mostrarDiscusion,
    añadirDiscusion,
    modificarDiscusion,
    eliminarDiscusion,
}