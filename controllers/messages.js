const Channel = require('../models/channel');
const Message = require('../models/message');
const Reply = require('../models/reply');

module.exports = {
    show,
    create,
    delete: deleteMessage
}

function show(req, res) {
    Channel.find({}, function(err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid).exec(function(err, channel) {
            if (err) return console.log(err);
            Message.findById(req.params.mid).populate('member').exec(function(err, message) {
                if (err) return console.log(err);
                Reply.find({message: message._id}).populate('member').exec(function(err, replies) {
                    if (err) return console.log(err);
                    res.render('messages/show', {
                        channel: {
                            current: channel,
                            all: channels
                        },
                        message,
                        replies,
                        user: req.user
                    });
                });
            });
        });
    });
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