const { check } = require('express-validator');
const enums = require('../enums.json');

exports.proccessUserData = [
    check('age').isInt({ min: 0 }),
    check('dependents').isInt({ min: 0 }),
    check('income').isInt({ min: 0 }),
    check('marital_status').isIn(enums.marital_status),
    check('risk_questions').custom((item) => {
        if (Array.isArray(item) && item.length == 3) {

            for (let i = 0; i < item.length; i++) {

                if (item[i] != 0 && item[i] != 1) {
                    return false
                }
            }
            return true
        } else {
            return false;
        }
    }),

    check('houses').custom((houses) => {
        if (Array.isArray(houses) && houses.length >= 0) {

            let keys = {};

            for (let i = 0; i < houses.length; i++) {


                if (Object.keys(houses[i]).length != 2)
                    return false;

                if (houses[i].hasOwnProperty('key') && houses[i].hasOwnProperty('ownership_status')) {
                    if (!enums.ownership_status.includes(houses[i].ownership_status))
                        return false;
                } else {
                    return false;
                }

                if (houses[i].key in keys)
                    return false;

                keys[houses[i].key] = true;

            }

            return true;
        } else {
            return false;
        }
    }),

    check('vehicles').custom((vehicles) => {
        if (Array.isArray(vehicles) && vehicles.length >= 0) {

            let keys = {};

            for (let i = 0; i < vehicles.length; i++) {


                if (Object.keys(vehicles[i]).length != 2)
                    return false;

                if (vehicles[i].hasOwnProperty('key') && vehicles[i].hasOwnProperty('year')) {
                    if (!Number.isInteger(vehicles[i].year) || vehicles[i].year < 0)
                        return false;
                } else {
                    return false;
                }

                if (vehicles[i].key in keys)
                    return false;

                keys[vehicles[i].key] = true;
            }

            return true;
        } else {
            return false;
        }
    })


]

