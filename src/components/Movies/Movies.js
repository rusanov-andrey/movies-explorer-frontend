import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import './Movies.css'

export  default function Movies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
      {false && <Preloader />}
    </div>
  );
}
