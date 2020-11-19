var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/user.controller');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;
