import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css'

import {
  COLUMNS_AMOUNT_1000, COLUMNS_AMOUNT_800, COLUMNS_AMOUNT_500, COLUMNS_AMOUNT_NARROW,
  START_LINE_AMOUNT_500, START_LINE_AMOUNT_NARROW,
  MORE_LINE_AMOUNT_500, MORE_LINE_AMOUNT_NARROW,
} from '../../utils/constants';

function renderCardList(saved, moviesList, onLike, onDislike, absentText) {
  if(moviesList.length === 0) {
    return (
      <div className='cardlist__notfound'>{absentText}</div>
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
    return COLUMNS_AMOUNT_1000;
  
  if(window.innerWidth > 800)
    return COLUMNS_AMOUNT_800;

  if(window.innerWidth > 500)
    return COLUMNS_AMOUNT_500;
  
  return COLUMNS_AMOUNT_NARROW;
}

function calculateStartLineAmount() {
  if(window.innerWidth > 500)
    return START_LINE_AMOUNT_500;
  
  return START_LINE_AMOUNT_NARROW;
}

function calculateMoreLineAmount() {
  if(window.innerWidth > 500)
    return MORE_LINE_AMOUNT_500;
  
  return MORE_LINE_AMOUNT_NARROW;
}


export default function MoviesCardList({saved, moviesList, onLike, onDislike, absentText}) {
  const [columnsAmount, setColumnsAmount] = React.useState(calculateColumnAmount());
  const [viewList, setViewList] = React.useState(moviesList.slice(0, calculateStartLineAmount()*columnsAmount));
  const  buttonIsVisible = (viewList.length < moviesList.length);

  function restartView() {
    const columnsAmount = calculateColumnAmount();
    setColumnsAmount(columnsAmount);
    setViewList(moviesList.slice(0, calculateStartLineAmount()*columnsAmount));
  }
  function onResize() {
    restartView();
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

  const hash = moviesList.map(movie => movie.id).join('||');

  React.useEffect(() => {
    setViewList(moviesList.slice(0, viewList.length));
  }, [moviesList]);

  React.useEffect(() => {
    console.log(`Reload view by hash`);
    restartView();
  }, [hash]);

  console.log(`MoviesCardList RENDER ${viewList.length} ${JSON.stringify(viewList.map((x) => {return {id:x.id, liked:x.liked}}))}`)
  return (
    <main className='cardlist'>
      { renderCardList(saved, viewList, onLike, onDislike, absentText) }
      { !saved && buttonIsVisible && <button className='cardlist__more' onClick={onMore}>Ещё</button> }
    </main>
  );
}