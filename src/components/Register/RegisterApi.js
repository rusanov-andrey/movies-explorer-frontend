
function registerUser(api, email, password, name) {
  return api.createUser({email, password, name})  
}

module.exports = {
  registerUser,
}