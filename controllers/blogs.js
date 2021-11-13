const Blog = require('../models/blog');
const Usuario = require('../models/articulo');
const db = require('mongoose');
const { response } = require('express');

const mostrarBlogs = async (req, res = response) => {
    const estado = { estado: true };

    const [total, blogs] = await Promise.all([
        Blog.countDocuments(estado),
        Blog.find(estado)
        // .populate('autor', 'nombre')
    ]);

    res.json({
        total,
        blogs
    });
}

const mostrarBlog = async (req, res = response) => {
    const { id } = req.params;
    const estado = { estado: true, id };

    const [total, blogs] = await Promise.all([
        Blog.countDocuments(estado),
        Blog.find(estado)
        // .populate('autor', 'nombre')
    ]);

    res.json({
        total,
        blogs
    });
}


const mostrarBlogDeUsuario = async (req, res = response) => {

    try {
        const { id } = req.params;

        const blog = await Blog.find({ autor: id })
            .populate('autor', 'nombre')

        res.status(200).json(blog);

    } catch (error) {
        res.json(error)
    }
}

const añadirBlog = async (req, res = response) => {
    const { titulo, descripcion, autor } = req.body;

    const blogDB = await Blog.findOne({ titulo });

    if (blogDB) {
        return res.status(400).json({
            msg: `El BLOG ${blogDB.titulo} ya existe`
        });
    }

    const creadoEn = new Date();

    const idDeAutor = db.Types.ObjectId(autor);

    // Generar la data a guardar
    const data = {
        titulo,
        descripcion,
        creadoEn,
        autor: idDeAutor
    }

    const blog = new Blog(data);

    // Guardar DB
    await blog.save();

    res.status(200).json(blog);
}

const eliminarBlog = async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id)

    res.status(200).json({ msg: 'Blog eliminado correctamente' })
}



module.exports = {
    mostrarBlog,
    mostrarBlogs,
    mostrarBlogDeUsuario,
    añadirBlog,
    eliminarBlog
}