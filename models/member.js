const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Member", memberSchema);