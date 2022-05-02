// const util = require('util');
const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const mapAnimalsByLocation = (cardinal) => (
  species.filter(({ location }) => location === cardinal).map(({ name }) => name));

function getAnimalSex(residents, options) {
  const animals = residents.filter((resident) => resident.sex === options.sex).map(
    ({ name }) => name,
  );
  return options.sorted === true ? animals.sort() : animals;
}

function includeName(cardinal, options) {
  return species.filter(({ location }) => location === cardinal).map(
    ({ name, residents }) => ({ name, residents }),
  ).map(({ name, residents }) => {
    const animals = residents.map((resident) => resident.name);
    const newObj = {};
    if (options && options.sorted === true) {
      newObj[name] = animals.sort();
    }
    if (options && options.sex) {
      const animalsOfSex = getAnimalSex(residents, options);
      newObj[name] = animalsOfSex;
    } else {
      newObj[name] = animals;
    }
    return newObj;
  });
}

const includeNames = (options) => ({
  NE: includeName('NE', options),
  NW: includeName('NW', options),
  SE: includeName('SE', options),
  SW: includeName('SW', options),
});

const getAnimalsLocation = (callback) => ({
  NE: mapAnimalsByLocation('NE'),
  NW: mapAnimalsByLocation('NW'),
  SE: mapAnimalsByLocation('SE'),
  SW: mapAnimalsByLocation('SW'),
});

function getAnimalMap(options) {
  if (options && options.includeNames === true) return includeNames(options);
  return getAnimalsLocation();
}

// console.log(util.inspect(getAnimalMap({ includeNames: true, sex: 'female', sorted: true }), false, null, false));

module.exports = getAnimalMap;
