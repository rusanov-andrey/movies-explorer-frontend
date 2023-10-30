import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css'

function renderCardList(saved, moviesList, onLike, onDislike) {
  if(moviesList.length === 0) {
    return (
      <div>Ничего не найдено</div>
    );
  }

  return (
    <ul className='cardlist__container'>
      {moviesList.map(movie => (
        <MoviesCard 
          key={movie.id} 
          _id={movie.id} 
          imgUrl={movie.imageUrl} 
          caption={movie.nameRU} 
          duration={movie.duration} 
          saved={saved} 
          liked={movie.liked} 
          trailerUrl={movie.trailerUrl} 
          onLike={onLike} 
          onDislike={onDislike}
        />
      ))}
    </ul>
  );

}

function calculateColumnAmount() {
  if(window.innerWidth > 1000)
    return 4;
  
  if(window.innerWidth > 800)
    return 3;

  if(window.innerWidth > 500)
    return 2;
  
  return 1;
}

function calculateStartLineAmount() {
  if(window.innerWidth > 500)
    return 4;
  
  return 5;
}

function calculateMoreLineAmount() {
  if(window.innerWidth > 500)
    return 1;
  
  return 2;
}


export default function MoviesCardList({saved, moviesList, onLike, onDislike}) {
  const [columnsAmount, setColumnsAmount] = React.useState(calculateColumnAmount());
  const [viewList, setViewList] = React.useState(moviesList.slice(0, calculateStartLineAmount()*columnsAmount));
  const  buttonIsVisible = (viewList.length < moviesList.length);

  function onResize() {
    setColumnsAmount(calculateColumnAmount(window.innerWidth));
  }

  function onMore(evt) {
    const currentLength = viewList.length;
    const columnsAmount = calculateColumnAmount();
    const nextLength = (Math.floor(currentLength / columnsAmount) + calculateMoreLineAmount()) * columnsAmount;

    setViewList(moviesList.slice(0,nextLength));
  }

  React.useEffect(() => {
    function clearEffect() {
      window.removeEventListener('resize', onResize);
    }

    window.addEventListener('resize', onResize);

    return clearEffect;
  });

  return (
    <main className='cardlist'>
      { renderCardList(saved, viewList, onLike, onDislike) }
      { !saved && buttonIsVisible && <button className='cardlist__more' onClick={onMore}>Ещё</button> }
    </main>
  );
}