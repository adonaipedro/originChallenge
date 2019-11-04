const express = require('express');
const router = express.Router();
const controller = require('../controllers/analysisController');
const routeControl = require('../routeControl');
const validations = require('../validations/analysis');

router.post('/', validations.proccessUserData, routeControl.checkErrors, controller.proccessUserData, routeControl.endRequest);
module.exports = router;