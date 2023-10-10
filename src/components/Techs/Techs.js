import AboutMainSubtitle from '../AboutMainSubtitle/AboutMainSubtitle'

import './Techs.css'

export  default function Techs() {
  return (
    <section className='about-techs'>
      <AboutMainSubtitle text="Технологии"/>
      <div className='about-techs__container'>
        <p className='about-techs__big-text'>7 технологий</p>
        <p className='about-techs__small-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className='about-techs__item-container'>
          <div className='about-techs__tech-item'>HTML</div>
          <div className='about-techs__tech-item'>CSS</div>
          <div className='about-techs__tech-item'>JS</div>
          <div className='about-techs__tech-item'>React</div>
          <div className='about-techs__tech-item'>Git</div>
          <div className='about-techs__tech-item'>Express.js</div>
          <div className='about-techs__tech-item'>mongoDB</div>
        </div>
      </div>
    </section>
  );
}