import ApiBase from './ApiBase'

export default class MoviesApi extends ApiBase{
  constructor() {
    super({
      baseUrl: 'https://api.nomoreparties.co',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getMovies() {
    return this._get('/beatfilm-movies');    
  }
}
