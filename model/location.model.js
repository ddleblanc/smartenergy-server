const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    inverters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inverter'
    }],
    }, {
    timestamps: true
});


module.exports = mongoose.model('location', LocationSchema);