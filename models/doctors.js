
const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

DoctorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); 
    return object;
})

module.exports = model( 'Doctor', DoctorSchema);