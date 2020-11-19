var express = require('express');
var router = express.Router();

const azureCtrl = require('../controllers/azure.controller');

router.post('/auth', azureCtrl.auth);
router.post('/second', azureCtrl.second);
router.post('/deploy', azureCtrl.deploy);
// router.post('/authenticate', userCtrl.authenticate);

module.exports = router;
