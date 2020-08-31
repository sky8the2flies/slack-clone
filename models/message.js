const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    content: String,
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'}
}, {
    timestamps: true
});

const messageSchema = new mongoose.Schema({
    content: String,
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    channel: {type: mongoose.Schema.Types.ObjectId, ref: 'Channel'},
    removed: {type: Boolean, default: false},
    replies: [replySchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);