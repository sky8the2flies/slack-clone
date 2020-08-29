const Channel = require('../models/channel');
module.exports = {
    index
}

function index(req, res) {
    Channel.find({}, ).populate('members').exec(function (err, channels) { 
        if (err) return console.log(err);
        res.render('index', { 
            channel: {
                current: null,
                all: channels
            },
            user: req.user
        });
    });
}