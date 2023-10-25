import AboutMainSubtitle from '../AboutMainSubtitle/AboutMainSubtitle'

import './AboutMe.css'
import author_photo from '../../images/author.png'

export  default function AboutMe() {
  return (
    <section className='aboutme'>
      <AboutMainSubtitle text='Студент'/>
      <div className='aboutme__container'>
        <div className='aboutme__info-container'>
          <div className='aboutme__info'>
            <div className='aboutme__name'>Виталий</div>
            <div className='aboutme__short'>Фронтенд-разработчик, 30 лет</div>
            <div className='aboutme__long'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</div>
          </div>
          <a className='aboutme__link' href='https://github.com/rusanov-andrey/'>Github</a>
        </div>
        <img className='aboutme__photo' src={author_photo} alt='Фотография автора'/>
      </div>
    </section>
  );
}
