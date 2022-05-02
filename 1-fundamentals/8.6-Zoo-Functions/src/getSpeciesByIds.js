const { species/* , animalIds */ } = require('../data/zoo_data');
const data = require('../data/zoo_data');

// const [lionId, ottersId, elephantsId, snakesId, frogsId, bearsId, tigersId, stephanieId, olaId, burlId] = animalIds;

const findId = (id) => species.find((thisSpecies) => thisSpecies.id === id);

function getSpeciesByIds(...ids) {
  return ids.map(findId);
}

module.exports = getSpeciesByIds;
