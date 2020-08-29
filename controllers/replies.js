const Message = require('../models/message');
const Reply = require('../models/reply');

module.exports = {
    create,
    delete: deleteReply
}

function create(req, res) {
    req.body.message = req.params.mid;
    req.body.member = req.user._id;
    const reply = new Reply(req.body);
    reply.save(function(err) {
        if (err) return console.log(err);
        Message.findById(req.params.mid, function(err, message) {
            if (err) return console.log(err);
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
        if (err) return console.log(err);
        Reply.findById(req.params.rid, function(err, reply) {
            if (err) return console.log(err);
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