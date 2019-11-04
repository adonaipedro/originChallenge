const riskRules = require('../riskRules');

exports.proccessUserData = async (req, res, next) => {

  let baseScore = req.body.risk_questions.reduce((a, b) => a + b, 0)
  let response = {
    life: baseScore,
    disability: baseScore,
    umbrella: baseScore,
    home: [],
    auto: []
  };

  for (let i = 0; i < req.body.houses.length; i++) {
    response.home.push({
      key: req.body.houses[i].key,
      value: baseScore
    })
  }

  for (let i = 0; i < req.body.vehicles.length; i++) {
    response.auto.push({
      key: req.body.vehicles[i].key,
      value: baseScore
    })
  }


  riskRules.firstRule(req.body, response);
  riskRules.secondRule(req.body, response);
  riskRules.thirdRule(req.body, response);
  riskRules.fourthRule(req.body, response);
  riskRules.fifthRule(req.body, response);
  riskRules.sixthRule(req.body, response);
  riskRules.seventhRule(req.body, response);
  riskRules.eighthRule(req.body, response);
  riskRules.ninthRule(req.body, response);
  riskRules.tenthRule(req.body, response);

  req.body = response;
  return next();
};