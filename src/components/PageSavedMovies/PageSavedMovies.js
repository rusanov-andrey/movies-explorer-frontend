import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

import './PageSavedMovies.css'

export default function PageSavedMovies() {
  return (
    <div className='page-saved-movies'>
      <SavedMovies />
      <Footer />
    </div>
  );
}
