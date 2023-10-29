
function updateProfile(api, email, name) {
  return api.updateProfile({email, name});
}

function logout(api) {
  return api.logout();
}

module.exports = {
  updateProfile,
  logout,
}