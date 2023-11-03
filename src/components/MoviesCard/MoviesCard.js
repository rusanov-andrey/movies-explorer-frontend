import './MoviesCard.css'

function printDuration(duration) {
  const d = parseInt(duration);

  if (d < 60) 
    return `${d}м`;

  return `${d/60 | 0}ч${d%60}м`;
}

export  default function MoviesCard({_id, imgUrl, caption, duration, saved, liked, trailerUrl, onLike, onDislike}) {
  function handleClick(evt) {
    if(liked) {
      handleDislike(evt);
      return;
    }

    onLike(_id);
  }

  function handleDislike(evt) {
    onDislike(_id);
  }

  return (
    <li className='card'>
      <a className='card__trailer' target="_blank" rel="noopener noreferrer" href={trailerUrl}>
        <img className='card__image' src={imgUrl} alt={caption}/>
      </a>
      <div className='card__info'>
        <p className='card__title'>{caption}</p>
        {!saved && <button className={'card__heart ' + (liked ? 'card__heart_liked' : '')} onClick={handleClick}/>}
        {saved && <button className='card__del' onClick={handleDislike}/>}
      </div>
      <p className='card__duration'>{printDuration(duration)}</p>
    </li>
  );
}