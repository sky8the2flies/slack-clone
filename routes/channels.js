var express = require('express');
var router = express.Router();
const channelCtrl = require('../controllers/channels');

router.post('/', channelCtrl.create);
router.get('/:cid', channelCtrl.show);

module.exports = router;