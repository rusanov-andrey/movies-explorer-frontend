function getMovies(cloudApi) {
  return cloudApi.getMovies();
}

function like(api, movie) {
  return api.saveMovie(movie.saveToDBJSON())
}

function dislike(api, _id) {
  return api.deleteSavedMovie(_id);
}

function getSavedMovies(api) {
  return api.getSavedMovies();
}

module.exports = {
  getMovies,
  like,
  dislike,
  getSavedMovies,
}