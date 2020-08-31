var express = require('express');
var router = express.Router();
const channelCtrl = require('../controllers/channels');
const messageCtrl = require('../controllers/messages');
const repliesCtrl = require('../controllers/replies');
const membersCtrl = require('../controllers/members');

router.post('/', channelCtrl.create);
router.put('/:cid', channelCtrl.update);
router.delete('/:cid', channelCtrl.delete);
router.get('/:cid/edit', channelCtrl.edit);

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

router.get('/:cid/members/new', membersCtrl.new);
router.post('/:cid/members', membersCtrl.create);

module.exports = router;