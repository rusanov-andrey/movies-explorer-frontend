import Header from '../Header/Header';
import AboutMain from '../AboutMain/AboutMain';
import Footer from '../Footer/Footer';

import './PageAbout.css'

export default function PageAbout({authorized}) {
  return (
    <div className='page-about'>
      <Header authorized={authorized} darkTheme={true} short={false}/>
      <AboutMain />
      <Footer />
    </div>
  );
}
