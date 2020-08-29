const Channel = require('../models/channel');
const Message = require('../models/message');
const Reply = require('../models/reply');

module.exports = {
    show,
    edit,
    create,
    delete: deleteMessage
}

function show(req, res) {
    Channel.find({}, function(err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid, function(err, chan) {
            if (err) return console.log(err);
            Message.find({channel: chan._id}).populate('member').exec(function(err, messages) {
                if (err) return console.log(err);
                console.log(messages)
                res.render('messages/show', {
                    channel: {
                        current: chan,
                        all: channels
                    },
                    messages,
                    user: req.user
                });
            });
        });
    });
}

function edit(req, res) {
    
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
    Message.findById(req.params.mid, function(err, message) {
        if (message.replies) {
            message.content = "This message was deleted."
            message.removed = true;
            message.save(function(err) {
                if (err) return console.log(err);
                res.redirect(`/channels/${req.params.cid}`)
            });
        } else {
            message.remove(function(err) {
                if (err) return console.log(err);
                res.redirect(`/channels/${req.params.cid}`)
            });
        }
    });
}