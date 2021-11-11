const db = require('mongoose');

const BlogSchema = db.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    descripcion: {
        type: String
    },
    creadoEn: {
        type: String,
        required: true
    },
    numberOfArticles: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    },
    autor: {
        type: db.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

BlogSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();

    return data;
}


module.exports = db.model('Blog', BlogSchema);