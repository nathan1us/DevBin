const router = require('express').Router();
const { pasteController } = require('../controllers');

router.get('/:id', pasteController.get);

router.post('/create', pasteController.post);

router.put('/:id', pasteController.put);

router.delete('/:id', pasteController.delete);

module.exports = router;