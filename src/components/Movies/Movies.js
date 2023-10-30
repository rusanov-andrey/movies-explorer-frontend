import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import './Movies.css'

import { AppContext } from '../../contexts/AppContext';

import { getMovies, like, dislike, getSavedMovies } from './MoviesApi'
import { MovieData } from '../../utils/MovieData';
import { CLOUD_URL } from '../../utils/constants';

export default function Movies() {
  const { mainApi, cloudApi } = React.useContext(AppContext);

  const [moviesList, setMoviesList] = React.useState(undefined);
  const [savedMoviesList, setSavedMoviesList] = React.useState(undefined);

  function updateLikes(allMovies, savedMovies) {
    const newMovieList = [...allMovies];
    for(let i = 0; i < newMovieList.length; i += 1) {
      newMovieList[i].updateLiked(savedMovies);
    }

    console.log(`onLike moviesList = ${JSON.stringify(allMovies)}`);
    console.log(`onLike newMovieList = ${JSON.stringify(newMovieList)}`);
    return newMovieList;
  }

  function updateMoviewModel(dbData, savedMoviesDataList) {
    const moviesDataList = dbData.map((movie) => (new MovieData()).loadFromCloudData(CLOUD_URL, movie));
    const updatedAllMoviesDataList = updateLikes(moviesDataList, savedMoviesDataList);
    return updatedAllMoviesDataList;
  }

  function updateSavedMoviewModel(dbData) {
    const savedMoviesDataList = dbData.map((movie) => (new MovieData(true)).loadFromDBData(movie));
    return savedMoviesDataList;
  }

  function onLike(_id) {
    console.log(`onLike id = ${_id}`);

    const index = moviesList.findIndex((movie) => movie.id === _id);
    if(index < 0)
      return;

    console.log(`onLike index = ${index}`);
    like(mainApi, moviesList[index])
      .then(() => {
        return getSavedMovies(mainApi);
      })
      .then((savedMovies) => {
        const savedMoviesDataList = updateSavedMoviewModel(savedMovies);
        const updatedAllMoviesDataList = updateLikes(moviesList, savedMoviesDataList);
        setSavedMoviesList(savedMoviesDataList);
        setMoviesList(updatedAllMoviesDataList);
        return true;
      })
      .catch(err => console.log);
  }

  function onDislike(_id) {
    const index = savedMoviesList.findIndex((movie) => movie.id === _id);
    if(index < 0)
      return;

    dislike(mainApi, savedMoviesList[index].dbId)
      .then(() => {
        return getSavedMovies(mainApi);
      })
      .then((savedMovies) => {
        const savedMoviesDataList = updateSavedMoviewModel(savedMovies);
        const updatedAllMoviesDataList = updateLikes(moviesList, savedMoviesDataList);
        setSavedMoviesList(savedMoviesDataList);
        setMoviesList(updatedAllMoviesDataList);
        return true;
      })
      .catch(err => console.log);
  }

  React.useEffect(() => {
    Promise.all([getMovies(cloudApi), getSavedMovies(mainApi)])
      .then(([cloudList, savedList]) => {
        /*console.log(`Promise.all([getMovies(cloudApi), getSavedMovies(mainApi)])`);
        console.log(`cloudList = ${JSON.stringify(cloudList)}`);
        console.log(`savedList = ${JSON.stringify(savedList)}`);
        const moviesDataList = cloudList.map((movie) => (new MovieData()).loadFromCloudData(CLOUD_URL, movie));
        const savedMoviesDataList = savedList.map((movie) => (new MovieData(true)).loadFromDBData(movie));
        console.log(`moviesDataList = ${JSON.stringify(moviesDataList)}`);
        console.log(`savedMoviesDataList = ${JSON.stringify(savedMoviesDataList)}`);
        const updatedAllMoviesDataList = updateLikes(moviesDataList, savedMoviesDataList)
        console.log(`updatedAllMoviesDataList = ${JSON.stringify(updatedAllMoviesDataList)}`);
        setSavedMoviesList(savedMoviesDataList);
        setTimeout( () => setMoviesList(updatedAllMoviesDataList), 5000);*/
        const savedMoviesDataList = updateSavedMoviewModel(savedList);
        const updatedAllMoviesDataList = updateMoviewModel(cloudList, savedMoviesDataList);
        setSavedMoviesList(savedMoviesDataList);
        setTimeout( () => setMoviesList(updatedAllMoviesDataList), 5000);
      })
      .catch(err => console.log);
  }, []);

  
  return (
    <div className='movies'>
      <SearchForm />
      {moviesList && <MoviesCardList saved={false} moviesList={moviesList} onLike={onLike} onDislike={onDislike}/>}
      {false && <Preloader />}
    </div>
  );
}
