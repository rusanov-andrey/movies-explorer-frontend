import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

import './PageSavedMovies.css'

export default function PageSavedMovies() {
  return (
    <div className='page-saved-movies'>
      <Header authorized={true} darkTheme={false} short={false}/>
      <SavedMovies />
      <Footer />
    </div>
  );
}
