
const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
// Gracias a mongoose podemos cambiar el nombre de la coleccion aquí
//{ collection: 'El nombre que vos quieras'}
);

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); 
    return object;
})

module.exports = model( 'Hospital', HospitalSchema);