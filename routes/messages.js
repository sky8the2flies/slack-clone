var express = require('express');
var router = express.Router();
const messageCtrl = require('../controllers/messages');

router.get('/:cid/', messageCtrl.show);
router.post('/:cid/messages', isLoggedIn, messageCtrl.create);
router.put('/:cid/messages/:mid', isLoggedIn, messageCtrl.update);
router.delete('/:cid/messages/:mid', isLoggedIn, messageCtrl.delete);
router.get('/:cid/messages/:mid/edit', isLoggedIn, messageCtrl.edit);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;