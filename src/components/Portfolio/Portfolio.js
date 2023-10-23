import './Portfolio.css'

export  default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul  className='portfolio__container'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='#'>
            <p className='portfolio__site'>Статичный сайт</p>
            <p className='portfolio__site portfolio__site_arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='#'>
          <p className='portfolio__site' href='#'>Адаптивный сайт</p>
          <p className='portfolio__site portfolio__site_arrow' href='#'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='#'>
          <p className='portfolio__site' href='#'>Одностраничное приложение</p>
          <p className='portfolio__site portfolio__site_arrow' href='#'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
