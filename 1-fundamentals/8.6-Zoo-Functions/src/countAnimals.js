const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const returnArr = (obj) => (
  obj !== species ? species.filter(({ name }) => name === Object.values(obj)[0]) : species);

const genderCount = ({ specie, sex }) => {
  const { residents } = species.find((thisAnimal) => thisAnimal.name === specie);
  return sex
    ? residents.reduce((acc, curr) => (curr.sex === sex ? acc + 1 : acc), 0)
    : residents.length;
};

function countAnimals(animal = species) {
  const result = returnArr(animal).reduce((acc, { name, residents }) => {
    const newObj = {};
    newObj[name] = residents.length;
    return Object.assign(acc, newObj);
  }, {});
  return animal !== species ? genderCount(animal) : result;
}

module.exports = countAnimals;
