import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import PageAbout from '../PageAbout/PageAbout';
import PageMovies from '../PageMovies/PageMovies';
import PageSavedMovies from '../PageSavedMovies/PageSavedMovies';
import PageProfile from '../PageProfile/PageProfile';
import PageRegister from '../PageRegister/PageRegister';
import PageLogin from '../PageLogin/PageLogin';
import NotFound  from '../NotFound/NotFound';

import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import { DEFAULT_USER } from '../../utils/constants'

import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';

import './App.css';


const mainApi = new MainApi();
const cloudApi = new MoviesApi();

function App() {
  const [currentUser, setCurrentUser] = React.useState(DEFAULT_USER);
  const [loginAttempt, setLoginAttempt] = React.useState(0);

  const authorized = (currentUser.email !== '');

  console.log(`loginAttempt ${loginAttempt}`);
  
  React.useEffect(() => {
    console.log('Reload profile data');
    mainApi.getProfile()
      .then((profileData) => {
        console.log(`getProfile ${JSON.stringify(profileData)}`)
        setCurrentUser(profileData);
      })
      .catch((errorData) => {
        console.log(`getProfile ERROR ${JSON.stringify(errorData)}`)
        setCurrentUser(DEFAULT_USER);
      })
  }, [loginAttempt]);

  return (
    <div className='app-container'>
      <AppContext.Provider value={{ mainApi, cloudApi, loginAttempt, setLoginAttempt }}>
      <CurrentUserContext.Provider value={ {currentUser, setCurrentUser} }>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PageAbout authorized={authorized}/>} />
            <Route path='/movies' element={<PageMovies/>} />
            <Route path='/saved-movies' element={<PageSavedMovies/>} />
            <Route path='/profile' element={<PageProfile/>} />
            <Route path='/signup' element={<PageRegister/>} />
            <Route path='/signin' element={<PageLogin/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
