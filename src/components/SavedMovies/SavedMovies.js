import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import './SavedMovies.css'

export  default function SavedMovies() {
  return (
    <div className='saved-movies'>
      <SearchForm fileName={''} shortTime={false} onSubmit={() => 1}/>
      <MoviesCardList saved={true} moviesList={[]} onLike={() => 1} onDislike={() => 1}/>
    </div>
  );
}
