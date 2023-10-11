import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css'

import pic001 from '../../images/001.png'
import pic002 from '../../images/002.png'
import pic003 from '../../images/003.png'
import pic004 from '../../images/004.png'
import pic005 from '../../images/005.png'

export  default function MoviesCardList() {
  return (
    <main className='cardlist'>
      <ul className='cardlist__container'>
        <MoviesCard img={pic001} caption='33 слова о дизайне' duration='100' liked={false}/>
        <MoviesCard img={pic002} caption='Киноальманах «100 лет дизайна»' duration='50' liked={false}/>
        <MoviesCard img={pic003} caption='В погоне за Бенкси' duration='100' liked={true}/>
        <MoviesCard img={pic004} caption='Баския: Взрыв реальности' duration='1000' liked={false}/>
        <MoviesCard img={pic005} caption='Бег это свобода' duration='100' liked={false}/>
      </ul>
      <input className='cardlist__more' type='button' value='Ещё'/>
    </main>
  );
}