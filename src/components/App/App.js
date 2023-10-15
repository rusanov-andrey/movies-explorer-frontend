import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import AboutMain from '../AboutMain/AboutMain';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound  from '../NotFound/NotFound';

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
          <Route path='/signup' element={<Register/>} />
          <Route path='/signin' element={<Login/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
