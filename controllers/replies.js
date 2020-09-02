const Message = require('../models/message');
const Channel = require('../models/channel');

module.exports = {
    show,
    edit,
    update,
    create,
    delete: deleteReply
}

function show(req, res) {
    Channel.find({}, function(err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid).exec(function(err, channel) {
            if (err || !channel) return res.redirect('/');
            Message.findById(req.params.mid).populate('member').populate({path: 'replies', populate: {path: 'member'}}).exec(function(err, message) {
                if (err || !message) return res.redirect('/');
                res.render('replies/show', {
                    channel: {
                        current: channel,
                        all: channels
                    },
                    message,
                    replies: message.replies,
                    user: req.user
                });
            });
        });
    });
}

function edit(req, res) {
    Channel.find({}, function(err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid).exec(function(err, channel) {
            if (err || !channel) return res.redirect('/');
            Message.findById(req.params.mid).populate('member').populate({path: 'replies', populate: {path: 'member'}}).exec(function(err, message) {
                if (err || !message) return res.redirect('/');
                res.render('replies/edit', {
                    channel: {
                        current: channel,
                        all: channels
                    },
                    message,
                    replies: {
                        current: req.params.rid,
                        all: message.replies
                    },
                    user: req.user
                });
            });
        });
    });
}

function update(req, res) {
    Message.findById(req.params.mid, function(err, message) {
        if (err || !message) return res.redirect('/');
        const reply = message.replies[message.replies.findIndex(reply => reply._id.equals(req.params.rid))];
        if (!reply.member.equals(req.user._id)) return res.redirect('/');
        reply.content = req.body.content;
        message.save(function (err) {
            if (err) return console.log(err);
            res.redirect(`/channels/${req.params.cid}/messages/${req.params.mid}`);
        });
    });
}


function create(req, res) {
    req.body.member = req.user._id;
    Message.findById(req.params.mid, function(err, message) {
        if (err || !message) return res.redirect('/');
        message.replies.push(req.body);
        message.save(function(err) {
            if (err) return console.log(err);
            res.redirect(`/channels/${req.params.cid}/messages/${req.params.mid}`);
        });
    });
}

function deleteReply(req, res) {
    Message.findById(req.params.mid, function(err, message) {
        if (err || !message) return res.redirect('/');
        const reply = message.replies[message.replies.findIndex(reply => reply._id.equals(req.params.rid))];
        if (!reply.member.equals(req.user._id)) return res.redirect('/');
        message.replies.splice(message.replies.findIndex(reply => reply._id.equals(req.params.rid)), 1)
        if (message.replies.length || !message.removed) {
            message.save(function(err) {
                if (err) return console.log(err);
                res.redirect(`/channels/${req.params.cid}/messages/${req.params.mid}`);
            });
        } else {
            message.remove(function(err) {
                if (err) return console.log(err);
                res.redirect(`/channels/${req.params.cid}`);
            });
        }
    });
}