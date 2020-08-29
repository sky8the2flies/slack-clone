const Channel = require('../models/channel');
const Message = require('../models/message');

module.exports = {
    create,
    delete: deleteChannel
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
