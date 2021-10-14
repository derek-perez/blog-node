const db = require('mongoose');

const ArticuloSchema = db.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    contenido: {
        type: String,
        required: [true, 'Necesitas añadir contenido a tu artículo']
    },
    creadoEn: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: String,
    autor: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    ],
    categoria: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Categoria'
        }
    ]
})

ArticuloSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();

    return data;
}


module.exports = db.model('Articulo', ArticuloSchema);