const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariantSchema = new Schema({
    variant: {
        type: String,
        required: true
    },
    config: {
        type: JSON
    }
    });


const Variant = mongoose.model('variant', VariantSchema);

module.exports = Variant;