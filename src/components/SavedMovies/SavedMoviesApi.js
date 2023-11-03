function dislike(api, _id) {
  return api.deleteSavedMovie(_id);
}

function getSavedMovies(api) {
  return api.getSavedMovies();
}

module.exports = {
  dislike,
  getSavedMovies,
}