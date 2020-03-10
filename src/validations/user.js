const { check } = require('express-validator');

exports.login = [
    check('username').not().isEmpty(),
    check('password').not().isEmpty()
]

