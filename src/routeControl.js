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

    req.body.life = finalScore(req.body.life);
    req.body.disability = finalScore(req.body.disability);
    req.body.umbrella = finalScore(req.body.umbrella);

    for (let i = 0; i < req.body.auto.length; i++) {
        req.body.auto[i].value = finalScore(req.body.auto[i].value);
    }

    for (let i = 0; i < req.body.home.length; i++) {
        req.body.home[i].value = finalScore(req.body.home[i].value);
    }

    res.status(200).send(req.body);

}

function finalScore(insuranceLine) {
    if (insuranceLine == 'ineligible')
        return 'ineligible';
    if (insuranceLine <= 0) {
        return 'economic';
    } else if (insuranceLine == 1 || insuranceLine == 2) {
        return 'regular';
    } else {
        return 'responsible'
    }
}