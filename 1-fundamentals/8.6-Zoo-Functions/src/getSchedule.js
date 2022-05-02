const { species, hours } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const officeHours = hours;

function getExhibitionAnimals(day) {
  return species.filter(({ name, availability }) => availability.includes(day)).map(
    ({ name }) => name,
  );
}

function scheduleDays(target) {
  let days;
  if (target) {
    days = [target];
  } else days = Object.keys(officeHours);
  // const days = [target];
  // console.log(days);
  const obj = {};
  days.forEach((day) => {
    let officeHour = `Open from ${officeHours[day].open}am until ${officeHours[day].close}pm`;
    let exhibition = getExhibitionAnimals(day);
    if (officeHours[day].open === 0) {
      officeHour = 'CLOSED';
      exhibition = 'The zoo will be closed!';
    }
    obj[day] = { officeHour, exhibition };
  });
  return obj;
}

function scheduleAnimal(target) {
  return species.find(({ name }) => name === target).availability;
}

function getSchedule(scheduleTarget) {
  if (!scheduleTarget || Object.keys(officeHours).includes(scheduleTarget)) {
    return scheduleDays(scheduleTarget);
  }
  if (species.find(({ name }) => name === scheduleTarget) === undefined) {
    return getSchedule();
  }
  return scheduleAnimal(scheduleTarget);
}

module.exports = getSchedule;
