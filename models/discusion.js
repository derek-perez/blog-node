const db = require('mongoose');
const mongoosePagination = require('mongoose-paginate-v2');

const DiscusionSchema = db.Schema({
    titulo: {
        type: String,
        required: [true, 'Es necesario tener un titulo para la discusión']
    },
    contenido: {
        type: String,
        required: [true, 'Es necesario tener el contenido de la discusión']
    },
    creadoEn: {
        type: String,
        required: true
    },
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
    ],
    comentarios: [
        {
            type: db.Schema.Types.ObjectId,
            ref: 'Categoria'
        }
    ]
});

DiscusionSchema.plugin(mongoosePagination);


module.exports = db.model('Discusion', DiscusionSchema);