const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const routeControl = require('../routeControl');
const validations = require('../validations/user');

router.post('/', validations.login, routeControl.checkErrors, controller.login, routeControl.endRequest);
module.exports = router;