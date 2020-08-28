const Channel = require('../models/channel');
const Message = require('../models/message');

module.exports = {
    show,
    create,
    delete: deleteChannel
}

function show(req, res) {
    Channel.find({}, function(err, channels) {
        if (err) return console.log(err);
        Channel.findById(req.params.cid, function(err, chan) {
            if (err) return console.log(err);
            Message.find({channel: chan._id}).populate('member').exec(function(err, messages) {
                if (err) return console.log(err);
                console.log(messages)
                res.render('channels/show', {
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

function create(req, res) {
    if (!req.user) { console.log('login numnuts'); return res.redirect('/');}
    req.body.name = req.body.name.trimEnd().trimStart().replace(/\s+/g, '-').replace(/\-+/g, '-').toLowerCase();
    req.body.channelType ? req.body.channelType = '1' : req.body.channelType = '0';
    req.body.members = [req.user._id];
    const channel = new Channel(req.body);
    channel.save(function(err) {
        if (err) console.log(err);
    });
    res.redirect('/');
}

function deleteChannel(req, res) {

}
