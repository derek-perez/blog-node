const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');
const Articulo = require('../models/articulo');


const existeCategoriaPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeCategoria = await Categoria.findById(id);

        if (!existeCategoria) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const existeUsuarioPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById(id);

        if (!existeUsuario) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const existeArticuloPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeArticulo = await Articulo.findById(id);

        if (!existeArticulo) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es admin`
        });
    }

    next();

}

const existeEmail = async (correo = '') => {
    const existeUsuarioEmail = await Usuario.findOne({ correo });
    if (existeUsuarioEmail) {
        throw new Error(`El correo: ${correo} ya está registrado`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}




module.exports = {
    existeCategoriaPorID,
    existeUsuarioPorID,
    existeArticuloPorID,
    esAdminRole,
    existeEmail,
    coleccionesPermitidas
}