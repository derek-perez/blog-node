const db = require('mongoose');

const CategoriaSchema = db.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    numberOfArticles: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }
});

CategoriaSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();

    return data;
}

module.exports = db.model('Categoria', CategoriaSchema);