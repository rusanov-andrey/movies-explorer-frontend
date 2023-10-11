import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import './SavedMovies.css'

export  default function SavedMovies() {
  return (
    <div className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}
