const data = require('../data/zoo_data');

const {
  childPrice,
  adultPrice,
  seniorPrice } = { childPrice: 20.99, adultPrice: 49.99, seniorPrice: 24.99 };

function countEntrants(entrants) {
  return entrants.reduce((acc, { age }) => {
    const { child, adult, senior } = acc;
    if (age < 18) return Object.assign(acc, { child: child + 1 });
    if (age >= 50) return Object.assign(acc, { senior: senior + 1 });
    return Object.assign(acc, { adult: adult + 1 });
  }, { child: 0, adult: 0, senior: 0 });
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const [children, adults, seniors] = Object.values(countEntrants(entrants));
  return (children * childPrice) + (adults * adultPrice) + (seniors * seniorPrice);
}

module.exports = { calculateEntry, countEntrants };
