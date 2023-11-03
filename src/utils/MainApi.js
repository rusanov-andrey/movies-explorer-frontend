import ApiBase from './ApiBase'

export default class MainApi extends ApiBase{
  constructor() {
    super({
      baseUrl: 'https://movie.rusanovandrey.nomoredomainsrocks.ru',
      headers: {
        'Content-Type': 'application/json'
      }    
    })
  }

  login({email, password}) {
    return this._post('/api/signin', {email, password});
  }

  logout() {
    return this._post('/api/signout', {}, {noResponseBody: true});
  }

  createUser({name, email, password}) {
    return this._post('/api/signup', {name, email, password});
  }

  getProfile() {
    return this._get('/api/users/me');
  }
  updateProfile(data) {
    return this._patch('/api/users/me', data)
  }

  getSavedMovies() {
    return this._get('/api/movies');
  }
  saveMovie({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}) {
    return this._post('/api/movies', {country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})
  }
  deleteSavedMovie(id) {
    return this._delete(`/api/movies/${id}`)
  }

}
