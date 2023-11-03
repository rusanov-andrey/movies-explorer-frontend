import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import './SavedMovies.css'

import { AppContext } from '../../contexts/AppContext';

import { dislike, getSavedMovies } from './SavedMoviesApi'
import { MovieData } from '../../utils/MovieData';

import { SHORT_TIME } from '../../utils/constants';

const DEFAULT_ABSENT_TEXT = 'Нет сохранённых фильмов';
const ERROR_ABSENT_TEXT = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

export  default function SavedMovies() {
  const { mainApi } = React.useContext(AppContext);

  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const [savedMoviesFilteredList, setSavedMoviesFilteredList] = React.useState(savedMoviesList);

  const [absentText, setAbsentText] = React.useState(DEFAULT_ABSENT_TEXT);

  function filterMovies(allMovies, filmName, shortTime) {
    const res = allMovies.filter(movie => (~(movie.nameRU.toLowerCase().indexOf(filmName.toLowerCase())) && ((!shortTime) || (movie.duration < SHORT_TIME))));
    return res;
  }

  function createModelList(dbData) {
    return dbData.map((movie) => (new MovieData(true)).loadFromDBData(movie));
  }

  function loadDataFromServer() {
    getSavedMovies(mainApi)
      .then((dbData) => {
        const savedList = createModelList(dbData);
        setSavedMoviesList(savedList);
        setSavedMoviesFilteredList(savedList);
        setAbsentText(DEFAULT_ABSENT_TEXT);
      })
      .catch(err => {
        console.log(err);
        setAbsentText(ERROR_ABSENT_TEXT);
      });
  }

  const [filmName, setFilmName] = React.useState('');
  const [shortTime, setShortTime] = React.useState(false);

  function handleSearch(filmName, shortTime) {
    setFilmName(filmName);
    setShortTime(shortTime);

    const res = filterMovies(savedMoviesList, filmName, shortTime);
    setSavedMoviesFilteredList(res);
  }

  function onDislike(_id) {
    console.log(`SavedMovies onDislike _id = ${_id}`);
    const index = savedMoviesList.findIndex((movie) => movie.id === _id);
    console.log(`SavedMovies onDislike index = ${index}`);
    if(index < 0)
      return;

    console.log(`SavedMovies onDislike dislike ${savedMoviesList[index].dbId}`);
    dislike(mainApi, savedMoviesList[index].dbId)
      .then(() => {
        const newList = [...savedMoviesList];
        newList.splice(index, 1);
        setSavedMoviesList(newList);

        const indexFiltered = savedMoviesFilteredList.findIndex((movie) => movie.id === _id);
        console.log(`SavedMovies onDislike indexFiltered = ${indexFiltered}`);
        if(indexFiltered < 0)
          return;

        const newFilteredList = [...savedMoviesFilteredList];
        newFilteredList.splice(indexFiltered, 1)
        setSavedMoviesFilteredList(newFilteredList);
      })
      .catch(err => console.log);
  }


  React.useEffect(() => {
    loadDataFromServer();
  }, [])

  return (
    <div className='saved-movies'>
      <SearchForm filmName={filmName} shortTime={shortTime} onSubmit={handleSearch}/>
      <MoviesCardList saved={true} moviesList={savedMoviesFilteredList} onDislike={onDislike} absentText={absentText}/>
    </div>
  );
}
