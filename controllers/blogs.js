const Blog = require('../models/blog');
const db = require('mongoose');
const { response } = require('express');
const Articulo = require('../models/articulo');

const mostrarBlogs = async (req, res = response) => {
    const estado = { public: true };

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
    const estado = { estado: true, _id: id };

    const blog = await Blog.find(estado);

    res.json(blog);
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

    await Articulo.find({ blog: id })
        .then(async arts => {
            arts.forEach(async a => {
                const blog = a._id;

                await Articulo.findByIdAndDelete({ _id: blog })
            })
            await Blog.findByIdAndDelete(id)

            res.status(200).json({ msg: 'Blog eliminado correctamente' })
        })
        .catch(console.log)
}

const actualizarBlog = async (req, res = response) => {
    try {
        const { id } = req.params;
        const cambios = req.body;

        const blogCambiado = await Blog.findByIdAndUpdate(id, cambios, { new: true });

        res.status(200).json(blogCambiado);

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    mostrarBlog,
    mostrarBlogs,
    mostrarBlogDeUsuario,
    añadirBlog,
    eliminarBlog,
    actualizarBlog
}