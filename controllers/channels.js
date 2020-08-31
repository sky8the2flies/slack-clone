const Channel = require('../models/channel');
const Message = require('../models/message');
const Invite = require('../models/invite');

module.exports = {
    create,
    delete: deleteChannel
}

function create(req, res) {
    if (!req.user) { return res.redirect('/');}
    req.body.name = req.body.name.trimEnd().trimStart().replace(/\s+/g, '-').replace(/\-+/g, '-').toLowerCase();
    req.body.channelType ? req.body.channelType = '1' : req.body.channelType = '0';
    req.body.members = [req.user._id];
    const channel = new Channel(req.body);
    channel.save(function(err) {
        if (err) console.log(err);
        res.redirect('/');
    });
}

function deleteChannel(req, res) {
    Channel.findById(req.params.cid, function(err, channel) {
        if (err || !channel) return res.redirect('/');
        if (!channel.members[0].equals(req.user._id)) return res.redirect('/');
        channel.remove(function (err) {
            if (err) return console.log(err);
            res.redirect('/');
            Invite.deleteMany({channel: req.params.cid}, function(err) {
                Message.deleteMany({channel: req.params.cid}, function(err) {
                    if (err) return console.log(err);
                });
            });
        });
    });
}
