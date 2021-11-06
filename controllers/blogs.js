const Blog = require('../models/blog');

const mostrarBlogs = async (req, res = response) => {
    const estado = { estado: true };

    const [total, blogs] = await Promise.all([
        Blog.countDocuments(estado),
        Blog.find(estado)
            .populate('autor', 'nombre')
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
            .populate('autor', 'nombre')
    ]);

    res.json({
        total,
        blogs
    });
}

const añadirBlog = async (req, res = response) => {
    const { titulo, autor } = req.body;

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
        creadoEn,
        idDeAutor
    }

    const blog = new Blog(data);

    // Guardar DB
    await blog.save();

    res.status(200).json(blog);
}



module.exports = {
    mostrarBlog,
    mostrarBlogs,
    añadirBlog
}