var express = require('express');
var router = express.Router();
const channelCtrl = require('../controllers/channels');
const messageCtrl = require('../controllers/messages');
const repliesCtrl = require('../controllers/replies');

router.post('/', channelCtrl.create);
router.get('/:cid', channelCtrl.show);
router.post('/:cid/messages', messageCtrl.create);
router.get('/:cid/messages/:mid', messageCtrl.show);
router.post('/:cid/messages/:mid', repliesCtrl.create);
router.delete('/:cid/messages/:mid', messageCtrl.delete);
router.delete('/:cid/messages/:mid/replies/:rid', repliesCtrl.delete);

module.exports = router;