const { response } = require("express");

const Articulo = require("../models/articulo");
const Categoria = require('../models/categoria');


const mostrarCategorias = async (req, res = response) => {
    const estado = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(estado),
        Categoria.find(estado)
    ]);

    res.json({
        total,
        categorias
    });
}

const mostrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id);

    res.json(categoria);

}

const añadirCategorias = async (req, res = response) => {
    const { nombre, description, numberOfArticles } = req.body;

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        description,
        numberOfArticles
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    res.status(200).json(categoria);
}

const editarCategorias = async (req, res = response) => {

    const { id } = req.params;
    const cambios = req.body;

    const categoriaCambiada = await Categoria.findByIdAndUpdate(id, cambios, { new: true });

    res.json(categoriaCambiada);

}

const eliminarCategorias = async (req, res = response) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(categoriaBorrada);

}

const mostrarArticulosDeCategoria = async (req, res = response) => {

    // Toma los articulos que estén en la categoría
    const { id } = req.params;
    const estado = { estado: true, categoria: id };
    const [total, articulos] = await Promise.all([
        Articulo.countDocuments(estado),
        Articulo.find(estado)
            .populate('autor', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        articulos
    });

}




module.exports = {
    mostrarCategorias,
    mostrarCategoria,
    añadirCategorias,
    editarCategorias,
    eliminarCategorias,
    mostrarArticulosDeCategoria
}