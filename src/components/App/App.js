import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import PageAbout from '../PageAbout/PageAbout';
import PageMovies from '../PageMovies/PageMovies';
import PageSavedMovies from '../PageSavedMovies/PageSavedMovies';
import PageProfile from '../PageProfile/PageProfile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound  from '../NotFound/NotFound';

import './App.css';

function App() {
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageAbout/>} />
          <Route path='/movies' element={<PageMovies/>} />
          <Route path='/saved-movies' element={<PageSavedMovies/>} />
          <Route path='/profile' element={<PageProfile/>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/signin' element={<Login/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
