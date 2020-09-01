var express = require('express');
var router = express.Router();
const membersCtrl = require('../controllers/members');

router.get('/:cid/members/new', isLoggedIn, membersCtrl.new);
router.post('/:cid/members/', isLoggedIn, membersCtrl.create);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;