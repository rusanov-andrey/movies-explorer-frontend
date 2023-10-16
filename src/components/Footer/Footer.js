import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info-container'>
        <span className='footer__date'>© 2023</span>
        <div className='footer__link-container'>
          <Link className='footer__link' to='https://practicum.yandex.ru/'>Яндекс.Практикум</Link>
          <Link className='footer__link' to='https://github.com/ivanovy'>Github</Link>
        </div>
      </div>
    </footer>
  );
}
