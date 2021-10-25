const { response } = require("express");

const Articulo = require('../models/articulo');
const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');

const mostrarArticulos = async (req, res = response) => {
    const estado = { estado: true };

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

const mostrarUltimos3 = async (req, res = response) => {
    const estado = { estado: true };

    Articulo.find(estado).limit(3).sort({ creadoEn: 1 })
        .then(collection => {
            res.json(collection);
        })
}

const obtenerIDS = async (req, res = response) => {
    const { categoria, usuario } = req.body;

    const [ctg, autor] = await Promise.all([
        Categoria.findById(categoria).then(c => c.nombre),
        Usuario.findById(usuario).then(u => u.nombre),
    ])

    return res.status(200).json({
        ctg,
        autor
    })
}

const mostrarArticulo = async (req, res = response) => {

    const { id } = req.params;
    const articulo = await Articulo.findById(id);

    res.json(articulo);

}

const añadirArticulo = async (req, res = response) => {
    const { titulo, contenido, img, autor, categoria } = req.body;

    const articuloDB = await Articulo.findOne({ titulo });

    if (articuloDB) {
        return res.status(400).json({
            msg: `El articulo ${articuloDB.titulo} ya existe`
        });
    }

    const creadoEn = new Date();

    // Generar la data a guardar
    const data = {
        titulo,
        contenido,
        creadoEn,
        img,
        autor,
        categoria,
    }

    const articulo = new Articulo(data);

    // Guardar DB
    await articulo.save();

    // Cuenta cuantos articulos hay en la categoria
    const estado = { estado: true, categoria }
    const total = await Articulo.countDocuments(estado);

    // Cambia la cantidad de articulos en "numberOfArticles"
    const categoriaACambiar = async () => {
        const cambios = { numberOfArticles: total };
        await Categoria.findByIdAndUpdate(categoria, cambios);
    }

    categoriaACambiar();

    res.status(200).json(articulo);
}

const editarArticulo = async (req, res = response) => {

    const { id } = req.params;
    const cambios = req.body;

    const articuloCambiado = await Articulo.findByIdAndUpdate(id, cambios, { new: true });

    res.json(articuloCambiado);

}

const eliminarArticulo = async (req, res = response) => {

    const { id } = req.params;
    const articuloEliminado = () => {
        Articulo.findById(id)
            .then(a => {
                const idMalo = a.categoria;
                const idAString = idMalo.toString();

                Categoria.findById(idAString)
                    .then(async c => {
                        // Se resta el número
                        const seElimina = c.numberOfArticles - 1;
                        // Se elimina de "numberOfArticles"
                        const cambios = { numberOfArticles: seElimina }
                        await Categoria.findByIdAndUpdate(idAString, cambios);
                    });

            })
    }

    articuloEliminado();

    const articuloBorrado = await Articulo.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(articuloBorrado);

}

const mostrarArticulosDeUsuario = async (req, res = response) => {

    const { usuario } = req.params;
    const articulo = await Articulo.find({ autor: usuario })
        .populate('autor', 'nombre')
        .populate('categoria', 'nombre')

    res.json(articulo);

}



module.exports = {
    mostrarArticulos,
    mostrarUltimos3,
    obtenerIDS,
    mostrarArticulo,
    añadirArticulo,
    editarArticulo,
    eliminarArticulo,
    mostrarArticulosDeUsuario
}