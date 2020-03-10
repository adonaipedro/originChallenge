const { validationResult } = require('express-validator');

exports.checkErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        return next();
    }
}

exports.endRequest = (req, res, next) => {
    res.status(200).send(res.locals);
}
