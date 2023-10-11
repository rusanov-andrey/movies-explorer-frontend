import './Portfolio.css'

export  default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <div  className='portfolio__container'>
        <div className='portfolio__item'>
          <a className='portfolio__site' href='#'>Статичный сайт</a>
          <a className='portfolio__site' href='#'>↗</a>
        </div>
        <div className='portfolio__item'>
          <a className='portfolio__site' href='#'>Адаптивный сайт</a>
          <a className='portfolio__site' href='#'>↗</a>
        </div>
        <div className='portfolio__item'>
          <a className='portfolio__site' href='#'>Одностраничное приложение</a>
          <a className='portfolio__site' href='#'>↗</a>
        </div>
      </div>
    </section>
  );
}
