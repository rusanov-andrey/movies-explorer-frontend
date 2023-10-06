import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'

import './AboutMain.css';

export default function AboutMain() {
  return (
    <div className='about-main'>
      <Promo />
      <AboutProject />
    </div>
  );
}
