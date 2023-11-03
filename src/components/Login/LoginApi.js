
function login(api, email, password) {
  return api.login({email, password});
}

module.exports = {
  login,
}