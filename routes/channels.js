var express = require('express');
var router = express.Router();
const channelCtrl = require('../controllers/channels');
const messageCtrl = require('../controllers/messages');
const repliesCtrl = require('../controllers/replies');

router.post('/', channelCtrl.create);
router.get('/:cid', messageCtrl.show);
router.post('/:cid/messages', messageCtrl.create);
router.put('/:cid/messages/:mid', messageCtrl.update);
router.delete('/:cid/messages/:mid', messageCtrl.delete);
router.get('/:cid/messages/:mid/edit', messageCtrl.edit);
router.get('/:cid/messages/:mid', repliesCtrl.show);
router.post('/:cid/messages/:mid', repliesCtrl.create);
router.put('/:cid/messages/:mid/replies/:rid', repliesCtrl.update);
router.delete('/:cid/messages/:mid/replies/:rid', repliesCtrl.delete);
router.get('/:cid/messages/:mid/replies/:rid/edit', repliesCtrl.edit);

module.exports = router;