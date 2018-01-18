const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    SN: {
        type: String,
        required: true
    },
    Time: {
        type: Date,
        required: true
    },
    EventID: {
        type: Number,
        required: true
    }
    }, {
    timestamps: true
});


const Alert = mongoose.model('alert', AlertSchema);


module.exports = Alert;