const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    channel: {type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Invite', inviteSchema);