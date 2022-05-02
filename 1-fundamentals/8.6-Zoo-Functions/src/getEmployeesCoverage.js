const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployee(search) {
  const result = employees.find(({ firstName, lastName, id }) => (
    firstName === search[0] || lastName === search[0] || id === search[0]));
  if (!result) throw new Error('Informações inválidas');
  return result;
}
function getAnimals(employee) {
  return employee.responsibleFor.reduce((acc, curr) => {
    acc.push(species.find(({ id }) => curr === id).name);
    return acc;
  }, []);
}

function getLocations(animals) {
  return animals.reduce((acc, curr) => {
    acc.push(species.find(({ name }) => curr === name).location);
    return acc;
  }, []);
}

function employeeCoverage(target) {
  try {
    const search = Object.values(target);
    const employee = getEmployee(search);
    const animals = getAnimals(employee);
    const locations = getLocations(animals);
    return {
      id: employee.id,
      fullName: `${employee.firstName} ${employee.lastName}`,
      species: animals,
      locations,
    };
  } catch (error) {
    throw error.message;
  }
}

function getEmployeesCoverage(target) {
  if (target) return employeeCoverage(target);
  const result = [];
  employees.forEach((employee) => result.push(employeeCoverage(employee)));
  return result;
}

module.exports = getEmployeesCoverage;
