
function validateEmail(value) {
  const re = /[a-zA-Z][\w\-.]*@[a-zA-Z][\w\-.]*\.[a-zA-Z]+/g;
  const status = re.test(value);
  console.log(`Custom validate email ${value} status=${status}`);
  return status ? '' : 'Введите правильное значение e-mail';
}

module.exports = {
  validateEmail,
}
