import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'

import './AboutMain.css';

export default function AboutMain() {
  return (
    <div className='about-main'>
      <Promo />
      <AboutProject />
      <Techs />
    </div>
  );
}
