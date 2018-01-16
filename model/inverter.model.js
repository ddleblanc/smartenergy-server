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
    solarpanels: [{
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});


const Inverter = mongoose.model('inverter', InverterSchema);

module.exports = Inverter;