const Member = require('../models/member');
const Channel = require('../models/channel');

module.exports = {
    new: newMember,
    create
}

function newMember(req, res) {
    Channel.find({}, function (err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid, function(err, channel) {
            if (err || !channel) return res.redirect('/');
            Member.find({}, function(err, members) {
                if (err) return console.log(err);
                res.render('invites/new', {
                    channel: {
                        current: channel,
                        all: channels
                    },
                    members,
                    user: req.user
                });
            });
        });
    });
}

function create(req, res) {
    Channel.findById(req.params.cid, function(err, channel) {
        if (err || !channel) res.redirect('/');
        channel.members.push(req.body.member);
        channel.save(function(err) {
            if (err) return console.log(err);
            res.redirect(`/channels/${req.params.cid}`)
        });
    });
}