const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    content: String,
    message: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Reply', replySchema);