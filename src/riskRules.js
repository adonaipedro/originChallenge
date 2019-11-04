/**
 * If the user doesn’t have income, a vehicle or a house, she is ineligible for disability, auto, and home insurance, respectively.
 */
exports.firstRule = (body, response) => {
  if (body.income == 0) {
    response.disability = "ineligible";
  }


  if (body.houses.length == 0) {
    for (let i = 0; i < response.home.length; i++) {
      response.home[i].value = "ineligible"
    }
  }

  if (body.vehicles.length == 0) {
    for (let i = 0; i < response.auto.length; i++) {
      response.auto[i].value = "ineligible"
    }
  }

}

/**
 * If the user is over 60 years old, she is ineligible for disability and life insurance.
 */
exports.secondRule = (body, response) => {
  if (body.age > 60) {
    response.disability = "ineligible";
    response.life = "ineligible";
  }
}

/**
 * If the user is under 30 years old, deduct 2 risk points from all lines of insurance. 
 * If she is between 30 and 40 years old, deduct 1.
 */
exports.thirdRule = (body, response) => {

  if (body.age < 30) {
    response.disability = changeLine(response.disability, -2);
    response.life = changeLine(response.life, -2);
    response.home = changeLine(response.home, -2);
    response.auto = changeLine(response.auto, -2);
    response.umbrella = changeLine(response.umbrella, -2);
  } else if (body.age >= 30 && body.age <= 40) {
    response.disability = changeLine(response.disability, -1);
    response.life = changeLine(response.life, -1);
    response.home = changeLine(response.home, -1);
    response.auto = changeLine(response.auto, -1);
    response.umbrella = changeLine(response.umbrella, -1);
  }
}

/**
 * If her income is above $200k, deduct 1 risk point from all lines of insurance.
 */
exports.fourthRule = (body, response) => {

  if (body.income > 200000) {
    response.disability = changeLine(response.disability, -1);
    response.life = changeLine(response.life, -1);
    response.home = changeLine(response.home, -1);
    response.auto = changeLine(response.auto, -1);
    response.umbrella = changeLine(response.umbrella, -1);
  }
}

/**
 * If the house is mortgaged, add 1 risk point to that home’s score.
 * If the user has at least one mortgaged house, add 1 risk point to her disability score.
 */
exports.fifthRule = (body, response) => {
  let addDisability = false;
  for (let i = 0; i < body.houses.length; i++) {
    if (body.houses[i].ownership_status == 'mortgaged') {
      addDisability = true;
      response.home = changeArrayScore(response.home, body.houses[i].key, 1);
    }
  }

  if (addDisability)
    response.disability = changeLine(response.disability, 1);

}

/**
 * If the user has dependents, add 1 risk point to both the disability and life scores.
 */
exports.sixthRule = (body, response) => {
  if (body.dependents > 0) {
    response.disability = changeLine(response.disability, 1);
    response.life = changeLine(response.life, 1);
  }
}

/**
 * If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
 */
exports.seventhRule = (body, response) => {
  if (body.marital_status == "married") {
    response.life = changeLine(response.life, 1);
    response.disability = changeLine(response.disability, -1);
  }
}

/**
 * If the vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.
 */
exports.eighthRule = (body, response) => {

  let currentYear = new Date().getFullYear();

  for (let i = 0; i < body.vehicles.length; i++) {
    if (currentYear - body.vehicles[i].year <= 5) {
      response.auto = changeArrayScore(response.auto, body.vehicles[i].key, 1)
    }
  }
}

/**
 * If the user has only one vehicle, add 1 point to that vehicle’s score. This same rule applies to houses.
 */
exports.ninthRule = (body, response) => {
  if (body.vehicles.length == 1 && response.auto[0].value != 'ineligible') {
    response.auto[0].value += 1;
  }

  if (body.houses.length == 1 && response.auto[0].value != 'ineligible') {
    response.home[0].value += 1;
  }
}

/**
 * If the user got an economic score in any of the four main lines of insurance (life, disability, home & auto), he is eligible to get umbrella insurance.
 */
exports.tenthRule = (body, response) => {

  let umbrellaAvailable = false;

  if (response.disability <= 0 || response.life <= 0) {
    umbrellaAvailable = true;
  }

  for (let i = 0; i < response.home.length; i++) {
    if (response.home[i].value <= 0) {
      umbrellaAvailable = true;
      break;
    }
  }

  for (let i = 0; i < response.auto.length; i++) {
    if (response.auto[i].value <= 0) {
      umbrellaAvailable = true;
      break;
    }
  }

  if (!umbrellaAvailable)
    response.umbrella = 'ineligible';

}

function changeArrayScore(arrayValues, key, value) {

  for (let i = 0; i < arrayValues.length; i++) {
    if (arrayValues[i].key == key && arrayValues[i].value != 'ineligible')
      arrayValues[i].value += value
  }

  return arrayValues;
}

function changeLine(line, value) {

  if (Array.isArray(line)) {
    for (let i = 0; i < line.length; i++) {
      if (line[i].value != 'ineligible')
        line[i].value += value;
    }
  } else if (line != 'ineligible')
    line += value;
  return line
}