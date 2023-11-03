export class MovieData {
  constructor(liked) {
    this.id = 0;
    this.dbId = 0;
    this.country = '';
    this.director = '';
    this.duration = 0;
    this.year = 0;
    this.description = '';
    this.imageUrl = '';
    this.trailerUrl = '';
    this.thumbnailUrl = '';
    this.nameRU = '';
    this.nameEN = '';
    this.liked = liked;
  }

  loadFromCloudData(baseUrl, {id, nameRU, nameEN, director, country, year, duration, description, trailerLink, image}) {
    this.id = id;
    this.country = country;
    this.director = director;
    this.duration = duration;
    this.year = parseInt(year);
    this.description = description;
    this.imageUrl = baseUrl + image.url;
    this.trailerUrl = trailerLink;
    this.thumbnailUrl = this.imageUrl;
    this.nameRU = nameRU;
    this.nameEN = nameEN;

    return this;
  }

  updateLiked(moviesList) {
    this.liked = moviesList.map(movie => movie.id).some((id) => id === this.id);
  }

  loadFromDBData({_id, country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}) {
    this.id = movieId;
    this.dbId = _id;
    this.country = country;
    this.director = director;
    this.duration = duration;
    this.year = year;
    this.description = description;
    this.imageUrl = image;
    this.trailerUrl = trailerLink;
    this.thumbnailUrl = thumbnail;
    this.nameRU = nameRU;
    this.nameEN = nameEN;
    this.liked = true;

    return this;
  }

  saveToDBJSON() {
    return {
      country: this.country, 
      director: this.director, 
      duration: this.duration, 
      year: this.year, 
      description: this.description, 
      image: this.imageUrl, 
      trailerLink: this.trailerUrl, 
      thumbnail: this.thumbnailUrl, 
      movieId: this.id, 
      nameRU: this.nameRU, 
      nameEN: this.nameEN,
    }
  }
}