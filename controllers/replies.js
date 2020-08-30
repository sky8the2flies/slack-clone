const Message = require('../models/message');
const Reply = require('../models/reply');
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
            if (err || !channel) return console.log(err);
            Message.findById(req.params.mid).populate('member').exec(function(err, message) {
                if (err || !message) return console.log(err);
                Reply.find({message: message._id}).populate('member').exec(function(err, replies) {
                    if (err) return console.log(err);
                    res.render('replies/show', {
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

function edit(req, res) {
    Channel.find({}, function(err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid).exec(function(err, channel) {
            if (err || !channel) return console.log(err);
            Message.findById(req.params.mid).populate('member').exec(function(err, message) {
                if (err || !message) return console.log(err);
                Reply.find({message: message._id}).populate('member').exec(function(err, replies) {
                    if (err) return console.log(err);
                    res.render('replies/edit', {
                        channel: {
                            current: channel,
                            all: channels
                        },
                        message,
                        replies: {
                            current: req.params.rid,
                            all: replies
                        },
                        user: req.user
                    });
                });
            });
        });
    });
}

function update(req, res) {
    Reply.findById(req.params.rid, function(err, reply) {
        if (err || !reply) return console.log(err);
        reply.content = req.body.content;
        reply.save(function (err) {
            if (err) return console.log(err);
            res.redirect(`/channels/${req.params.cid}/messages/${req.params.mid}`);
        });
    });
}


function create(req, res) {
    req.body.message = req.params.mid;
    req.body.member = req.user._id;
    const reply = new Reply(req.body);
    reply.save(function(err) {
        if (err) return console.log(err);
        Message.findById(req.params.mid, function(err, message) {
            if (err || !message) return console.log(err);
            message.replies.push(true);
            message.save(function(err) {
                if (err) return console.log(err);
                res.redirect(`/channels/${req.params.cid}/messages/${req.params.mid}`);
            });
        });
    })
}

function deleteReply(req, res) {
    Message.findById(req.params.mid, function(err, message) {
        if (err || !message) return console.log(err);
        Reply.findById(req.params.rid, function(err, reply) {
            if (err || !reply) return console.log(err);
            message.replies.pop();
            if (message.replies.length || !message.removed) {
                message.save(function(err) {
                    if (err) return console.log(err);
                    reply.remove(function(err) {
                        if (err) return console.log(err);
                        res.redirect(`/channels/${req.params.cid}/messages/${req.params.mid}`);
                    });
                });
            } else {
                message.remove(function(err) {
                    if (err) return console.log(err);
                    reply.remove(function(err) {
                        if (err) return console.log(err);
                        res.redirect(`/channels/${req.params.cid}`);
                    });
                });
            }
        });
    });
}