import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import AboutMain from '../AboutMain/AboutMain';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import './App.css';

function App() {
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AboutMain/>} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/saved-movies' element={<SavedMovies/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
