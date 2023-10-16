import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

import './PageMovies.css'

export default function PageMovies() {
  return (
    <div className='page-movies'>
      <Movies />
      <Footer />
    </div>
  );
}
