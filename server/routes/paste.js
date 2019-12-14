const router = require('express').Router();
const { pasteController } = require('../controllers');

router.post('/create', pasteController.post);

module.exports = router;