import AboutMainSubtitle from '../AboutMainSubtitle/AboutMainSubtitle'

import './AboutProject.css'

export  default function AboutProject() {
  return (
    <section className='about-project'>
      <AboutMainSubtitle text='О проекте'/>
      <div className='about-project__description-container'>
        <p className='about-project__item-title'>Дипломный проект включал 5 этапов</p>
        <p className='about-project__item-title'>На выполнение диплома ушло 5 недель</p>
        <p className='about-project__item-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className='about-project__item-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className='about-project__progress-container'>
        <div className='about-project__bar  about-project__bar_color_green'>1 неделя</div>
        <div className='about-project__bar'>4 неделя</div>
        <div className='about-project__bar-description'>Back-end</div>
        <div className='about-project__bar-description'>Front-end</div>
      </div>
    </section>
  );
}
