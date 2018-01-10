const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterDataSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Time: {
        type: Date,
        required: true
    },
    Energy: {
        type: Number,
        required: true
    },
    Raw: [{
        type: mongoose.Schema.Types.ObjectId
    }]
    });


const MasterData = mongoose.model('masterData', MasterDataSchema);

module.exports = MasterData;