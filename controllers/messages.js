const Message = require('../models/message');

module.exports = {
    show,
    create,
    delete: deleteMessage
}

function show(req, res) {
    
}

function create(req, res) {
    req.body.channel = req.params.cid;
    req.body.member = req.user._id;
    const message = new Message(req.body);
    message.save(function(err) {
        if (err) return console.log(err);
        res.redirect(`/channels/${req.params.cid}`);
    });
}

function deleteMessage(req, res) {

}