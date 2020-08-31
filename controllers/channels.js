const Channel = require('../models/channel');
const Message = require('../models/message');
const Member = require('../models/member');

module.exports = {
    create,
    edit,
    update,
    delete: deleteChannel
}

function create(req, res) {
    req.body.name = req.body.name.trimEnd().trimStart().replace(/\s+/g, '-').replace(/\-+/g, '-').toLowerCase();
    req.body.channelType ? req.body.channelType = '1' : req.body.channelType = '0';
    req.body.members = [req.user._id];
    const channel = new Channel(req.body);
    channel.save(function(err) {
        if (err) console.log(err);
        res.redirect(`/`);
    });
}

function edit(req, res) {
    Channel.find({}, function(err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid, function(err, channel) {
            if (err || !channel) return res.redierct('/');
            if (!req.user || !req.user._id.equals(channel.members[0])) return res.redirect(`/channels/${req.params.cid}`);
            res.render('channels/edit', {
                channel: {
                    current: channel,
                    all: channels
                },
                user: req.user
            });
        });
    });
}

function update(req, res) {
    req.body.name = req.body.name.trimEnd().trimStart().replace(/\s+/g, '-').replace(/\-+/g, '-').toLowerCase();
    req.body.channelType ? req.body.channelType = '1' : req.body.channelType = '0';
    Channel.findById(req.params.cid, function(err, channel) {
        if (err || !channel) return res.redirect('/');
        channel.name = req.body.name;
        channel.description = req.body.description;
        channel.channelType = req.body.channelType;
        channel.save(function(err) {
            if (err) console.log(err);
            res.redirect(`/channels/${req.params.cid}`);
        });
    });
}

function deleteChannel(req, res) {
    Channel.findById(req.params.cid, function(err, channel) {
        if (err || !channel) return res.redirect('/');
        if (!channel.members[0].equals(req.user._id)) return res.redirect('/');
        channel.remove(function (err) {
            if (err) return console.log(err);
            res.redirect('/');
            Message.deleteMany({channel: req.params.cid}, function(err) {
                if (err) return console.log(err);
            });
        });
    });
}
