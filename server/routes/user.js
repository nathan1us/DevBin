const router = require('express').Router();
const { userController } = require('../controllers');

router.put('/:username', userController.put.edit);

router.post('/login', userController.post.login);
router.post('/register', userController.post.register);
router.post('/logout', userController.post.logout);

module.exports = router;