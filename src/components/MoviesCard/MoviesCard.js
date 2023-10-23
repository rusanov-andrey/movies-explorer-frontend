import './MoviesCard.css'

function printDuration(duration) {
  const d = parseInt(duration);

  if (d < 60) 
    return `${d}м`;

  return `${d/60 | 0}ч${d%60}м`;
}

export  default function MoviesCard({img, caption, duration, saved, liked}) {
  return (
    <li className='card'>
      <img className='card__image' src={img} alt={caption}/>
      <div className='card__info'>
        <p className='card__title'>{caption}</p>
        {!saved && <button className={'card__heart ' + (liked ? 'card__heart_liked' : '')}/>}
        {saved && <button className='card__del'/>}
      </div>
      <p className='card__duration'>{printDuration(duration)}</p>
    </li>
  );
}