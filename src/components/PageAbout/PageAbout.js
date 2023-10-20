import Header from '../Header/Header';
import AboutMain from '../AboutMain/AboutMain';
import Footer from '../Footer/Footer';

import './PageAbout.css'

export default function PageAbout() {
  return (
    <div className='page-about'>
      <Header authorized={true} darkTheme={true} short={false}/>
      <Header authorized={false} darkTheme={true} short={false}/>
      <AboutMain />
      <Footer />
    </div>
  );
}
