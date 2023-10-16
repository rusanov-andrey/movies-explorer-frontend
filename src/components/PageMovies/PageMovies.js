import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

import './PageMovies.css'

export default function PageMovies() {
  return (
    <div className='page-movies'>
      <Header authorized={true} darkTheme={false} short={false}/>
      <Movies />
      <Footer />
    </div>
  );
}
