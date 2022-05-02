const { species, employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const employee = employees.find(({ id: employeeId }) => employeeId === id);
  const responsibleFor = employee.responsibleFor[0];
  const animals = species.find(({ id: animalId }) => animalId === responsibleFor).residents;
  const oldestAnimal = animals.sort((a, b) => b.age - a.age);
  return Object.values(oldestAnimal[0]);
}

console.log(getOldestFromFirstSpecies('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

module.exports = getOldestFromFirstSpecies;
