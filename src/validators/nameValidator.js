
function validateName(value) {
  const re = /^[a-zA-Zа-яА-ЯёЁ -]+$/g;
  const status = re.test(value);
  console.log(`Custom validate name ${value} status=${status}`);
  return status ? '' : 'Введите правильное значение имени';
}

module.exports = {
  validateName,
}
