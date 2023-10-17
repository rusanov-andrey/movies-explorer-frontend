import './Promo.css'

export  default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__image'/>
      <div className='promo_info'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className='promo__button' href='https://ya.ru/'>Узнать больше</a>
      </div>
    </section>
  );
}
