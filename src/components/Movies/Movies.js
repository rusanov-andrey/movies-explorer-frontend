import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import './Movies.css'

import { AppContext } from '../../contexts/AppContext';

import { getMovies, like, dislike, getSavedMovies } from './MoviesApi'
import { MovieData } from '../../utils/MovieData';
import { CLOUD_URL, SHORT_TIME } from '../../utils/constants';
import { DEFAULT_ABSENT_TEXT, ERROR_ABSENT_TEXT } from './constants';

export default function Movies() {
  const { mainApi, cloudApi } = React.useContext(AppContext);

  const [preloader, setPreloader] = React.useState(false);

  const [moviesList, setMoviesList] = React.useState(undefined);
  const [moviesFilteredList, setMoviesFilteredList] = React.useState(undefined);
  const [savedMoviesList, setSavedMoviesList] = React.useState(undefined);
  const [movieDataIsLoaded, setMovieDataIsLoaded] = React.useState(false);

  const [absentText, setAbsentText] = React.useState(DEFAULT_ABSENT_TEXT);

  function updateLikes(allMovies, savedMovies) {
    const newMovieList = [...allMovies];
    for(let i = 0; i < newMovieList.length; i += 1) {
      newMovieList[i].updateLiked(savedMovies);
    }

    console.log(`updateLikes moviesList = ${JSON.stringify(allMovies)}`);
    console.log(`updateLikes newMovieList = ${JSON.stringify(newMovieList)}`);
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

  function updateAll(savedMovies, filmName, shortTime) {
    console.log(`updateAll`);
    const savedMoviesDataList = updateSavedMoviewModel(savedMovies);
    const updatedAllMoviesDataList = updateLikes(moviesList, savedMoviesDataList);
    setSavedMoviesList(savedMoviesDataList);
    setMoviesList(updatedAllMoviesDataList);
    return filterMovies(updatedAllMoviesDataList, filmName, shortTime);
  }

  function filterMovies(allMovies, filmName, shortTime) {
    console.log(`filterMovies ${filmName} ${shortTime}`)
    console.log(`filterMovies ${JSON.stringify(allMovies)}`)
    const res = allMovies.filter(movie => (~(movie.nameRU.toLowerCase().indexOf(filmName.toLowerCase())) && ((!shortTime) || (movie.duration < SHORT_TIME))));
    console.log(`filterMovies ${JSON.stringify(res)}`)
    setMoviesFilteredList(res);
    return res;
  }
  
  function loadDataFromServer(filmName, shortTime, updateFilteredList, save) {
    console.log(`loadDataFromServer Promise.all([getMovies(cloudApi), getSavedMovies(mainApi)])`);
    setPreloader(true);
    Promise.all([getMovies(cloudApi), getSavedMovies(mainApi)])
      .then(([cloudList, savedList]) => {
        console.log(`loadDataFromServer then(([cloudList, savedList])`);
        const savedMoviesDataList = updateSavedMoviewModel(savedList);
        const updatedAllMoviesDataList = updateMoviewModel(cloudList, savedMoviesDataList);
        setSavedMoviesList(savedMoviesDataList);
        setMovieDataIsLoaded(true);
        setMoviesList(updatedAllMoviesDataList);

        if(updateFilteredList) {
          const res = filterMovies(updatedAllMoviesDataList, filmName, shortTime);

          if(save)
            save(filmName, shortTime, res);
        }

        setAbsentText(DEFAULT_ABSENT_TEXT);
        setPreloader(false);
        return true;
      })
      .catch(err => {
        console.log(err);
        setAbsentText(ERROR_ABSENT_TEXT);
        return false;
      })
  }

  function onLike(_id) {
    console.log(`onLike id = ${_id}`);
    console.log(`onLike moviesList = ${JSON.stringify(moviesList)}`);

    const index = moviesList.findIndex((movie) => movie.id === _id);
    console.log(`onLike index = ${index}`);
    if(index < 0)
      return;

    console.log(`onLike index = ${index}`);
    like(mainApi, moviesList[index])
      .then(() => {
        return getSavedMovies(mainApi);
      })
      .then((savedMovies) => {
        const filteredList = updateAll(savedMovies, filmName, shortTime);
        saveToLocalStorage(filmName, shortTime, filteredList);
        return true;
      })
      .catch(err => console.log);
  }

  function onDislike(_id) {
    console.log(`onDislike id = ${_id}`);
    console.log(`onDislike savedMoviesList = ${JSON.stringify(savedMoviesList)}`);

    const index = savedMoviesList.findIndex((movie) => movie.id === _id);
    console.log(`onDislike index = ${index}`);
    if(index < 0)
      return;

    dislike(mainApi, savedMoviesList[index].dbId)
      .then(() => {
        return getSavedMovies(mainApi);
      })
      .then((savedMovies) => {
        const filteredList = updateAll(savedMovies, filmName, shortTime);
        saveToLocalStorage(filmName, shortTime, filteredList);
        return true;
      })
      .catch(err => console.log);
  }

  const [filmName, setFilmName] = React.useState('');
  const [shortTime, setShortTime] = React.useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = React.useState(false);

  function saveToLocalStorage(filmName, shortTime, moviesFilteredList) {
    console.log(`saveToLocalStorage`);
    (filmName !== undefined) && localStorage.setItem('MovieName', filmName);
    (shortTime !== undefined) && localStorage.setItem('ShortTime', shortTime);
    localStorage.setItem('FilteredMovie', JSON.stringify(moviesFilteredList));
  }

  function loadFromLocalStorage() {
    const strData = localStorage.getItem('FilteredMovie');
    let moviesFilteredList = undefined;
    if(strData) {
      try {
        moviesFilteredList = JSON.parse(strData);
        setLoadedFromStorage(true);
      } catch(e) {
        console.log(e);
      }
    }
    
    let shortTime = localStorage.getItem('ShortTime');
    if(shortTime !== undefined) {
      shortTime = (shortTime === 'true');
    }

    return ({
      movieName: localStorage.getItem('MovieName'),
      shortTime: shortTime,
      moviesFilteredList: moviesFilteredList,
    });
  }

  function handleSearch(filmName, shortTime) {
    console.log(`Movies::handleSearch ${filmName} ${shortTime}`);
    setFilmName(filmName);
    setShortTime(shortTime);

    if(movieDataIsLoaded) {
      const currentFilteredMoviesList = filterMovies(moviesList, filmName, shortTime);
      saveToLocalStorage(filmName, shortTime, currentFilteredMoviesList)
      return;
    }
    else {
      saveToLocalStorage(filmName, shortTime, loadFromLocalStorage().moviesFilteredList);
    }

    console.log(`Loadin movies`);
    loadDataFromServer(filmName, shortTime, true, saveToLocalStorage);

  }

  React.useEffect(() => {
    const res = loadFromLocalStorage();
    if(res.movieName !== undefined)
      setFilmName(res.movieName);

    if(res.shortTime !== undefined)
      setShortTime(res.shortTime);

    if(res.moviesFilteredList !== undefined) {
      if(res.moviesFilteredList.length)  {
        loadDataFromServer(res.movieName, res.shortTime);
        setMoviesFilteredList(res.moviesFilteredList);
      }
    }
  }, []);

  
  console.log(`Movies RENDER ${filmName} ${shortTime} ${JSON.stringify(moviesFilteredList)}`);
  return (
    <div className='movies'>
      <SearchForm filmName={filmName} shortTime={shortTime} onSubmit={handleSearch} searchResultsWasLoaded={loadedFromStorage}/>
      {moviesFilteredList && <MoviesCardList saved={false} moviesList={moviesFilteredList} onLike={onLike} onDislike={onDislike} absentText={absentText}/>}
      {preloader && <Preloader />}
    </div>
  );
}
