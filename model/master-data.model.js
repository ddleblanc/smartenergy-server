const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterDataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    energy: {
        type: Number,
        required: true
    },
    raw: [{
        type: mongoose.Schema.Types.ObjectId
    }]
    });


const MasterData = mongoose.model('masterData', MasterDataSchema);

module.exports = MasterData;