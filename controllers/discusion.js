const db = require('mongoose');
const { response } = require("express");

const Discusion = require('../models/discusion');

const mostrarDiscusiones = async (req, res = response) => {
    await Discusion.find()
        .then(resp => res.status(200).json({ resp }))
}

const mostrarDiscusion = async (req, res = response) => {
    const { id } = req.params;

    await Discusion.find({ _id: id })
        .then(resp => res.status(200).json({ resp }))
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
    modificarDiscusion,
    eliminarDiscusion,
}