const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  try {
    if (!isManager(managerId)) {
      throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
    }
    return employees.filter((employee) => (
      employee.managers.includes(managerId)
    )).map(({ firstName, lastName }) => `${firstName} ${lastName}`);
  } catch (error) {
    throw error.message;
  }
}

module.exports = { isManager, getRelatedEmployees };
