
function registerUser(api, email, password, name) {
  return api.createUser({email, password, name})  
}

function login(api, email, password) {
  return api.login({email, password})  
}

module.exports = {
  registerUser,
  login
}