import './Portfolio.css'

export  default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul  className='portfolio__container'>
        <li className='portfolio__item'>
          <a className='portfolio__link' target="_blank" rel="noopener noreferrer" href='https://code.s3.yandex.net/web-developer/final-projects/project-1/index.html'>
            <p className='portfolio__site'>Статичный сайт</p>
            <p className='portfolio__site portfolio__site_arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target="_blank" rel="noopener noreferrer" href='https://rusanov-andrey.github.io/russian-travel/index.html'>
            <p className='portfolio__site'>Адаптивный сайт</p>
            <p className='portfolio__site portfolio__site_arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target="_blank" rel="noopener noreferrer" href='https://mestof.rusanovandrey.nomoredomainsrocks.ru'>
            <p className='portfolio__site'>Одностраничное приложение</p>
            <p className='portfolio__site portfolio__site_arrow'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
