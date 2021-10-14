const db = require('mongoose');

const UsuarioSchema = db.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatario']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatario'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}

module.exports = db.model('Usuario', UsuarioSchema);