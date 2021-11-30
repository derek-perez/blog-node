const db = require('mongoose');

const ComentarioSchema = db.Schema({
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },
    autor: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    ],
    articulo: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Articulo'
        }
    ],
    discusion: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Discusion'
        }
    ]
})

module.exports = db.model('Comentario', ComentarioSchema);