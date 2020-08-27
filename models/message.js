const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reply'}],
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    channel: {type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);