const Channel = require('../models/channel');

module.exports = {
    show,
    create,
    delete: deleteChannel
}

function show(req, res) {
    Channel.find({}, function(err, chanels) {
        if (err) return console.log(err);
        res.render('')
    });
}

function create(req, res) {

}

function deleteChannel(req, res) {

}
