var express = require('express');
var router = express.Router();
const channelCtrl = require('../controllers/channels');

router.post('/', isLoggedIn, channelCtrl.create);
router.put('/:cid', isLoggedIn, channelCtrl.update);
router.delete('/:cid', isLoggedIn, channelCtrl.delete);
router.get('/:cid/edit', isLoggedIn, channelCtrl.edit);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;