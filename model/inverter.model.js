const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InverterSchema = new Schema({
    SN: {
        type: String,
        required: true
    },
    DeviceName: {
        type: String,
        required: true
    },
    Online: {
        type: Boolean,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    DeviceModel: {
        type: String,
        required: true
    },
    DisplaySoftwareVersion: {
        type: String,
        required: true
    },
    MasterControlSoftwareVersion: {
        type: String,
        required: true
    },
    SlaveControlVersion: {
        type: String,
        required: true
    },
    alerts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'alert'
    }],
    rawData: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    masterData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'masterData'
    }]
}, {
    timestamps: true
});


const Inverter = mongoose.model('inverter', InverterSchema);


// const inverter = new Inverter({
// }).save();

module.exports = Inverter;