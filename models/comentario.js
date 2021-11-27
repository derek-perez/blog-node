const db = require('mongoose');

const ComentarioSchema = db.Schema({
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },
    autor: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Autor'
        },
        { required: true }
    ],
    articulo: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Articulo'
        },
        { required: false }
    ],
    discusion: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Discusion'
        },
        { required: false }
    ]
})

module.exports = db.model('Comentario', ComentarioSchema);