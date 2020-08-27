const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: String,
    description: String,
    channelType: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Member'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Channel', channelSchema);