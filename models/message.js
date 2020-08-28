const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    channel: {type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);