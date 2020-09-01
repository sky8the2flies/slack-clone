var express = require('express');
var router = express.Router();
const repliesCtrl = require('../controllers/replies');

router.get('/:cid/messages/:mid/', repliesCtrl.show);
router.post('/:cid/messages/:mid/', isLoggedIn, repliesCtrl.create);
router.put('/:cid/messages/:mid/replies/:rid', isLoggedIn, repliesCtrl.update);
router.delete('/:cid/messages/:mid/replies/:rid', isLoggedIn, repliesCtrl.delete);
router.get('/:cid/messages/:mid/replies/:rid/edit', isLoggedIn, repliesCtrl.edit);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;