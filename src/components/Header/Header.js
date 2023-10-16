import NavigationBar from '../NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';

import './Header.css'

export default function Header({authorized, darkTheme, short}) {
  function renderAccauntInfo() {
    return (
      <div className='header__link-container'>
        <Link className={'header__account-button ' + (darkTheme ? 'header__account-button_accent' : '')} to='/profile'><span className='header__account-text'>Аккаунт</span><div className='header__account-icon'></div></Link>
      </div>
    )
  }

  function renderEntranceLinks() {
    return (
      <div className='header__link-container'>
        <Link className='header__registration-link' to='/signup'>Регистрация</Link>
        <Link className='header__entrance-link' to='/signin'>Войти</Link>
      </div>
    );
  }

  return (
    <header className= {'header ' + (darkTheme ? 'header_dark' : '')}>
      <Link className='header__logo-link' to='/'>
        <div className='header__logo' />
      </Link>
      { authorized && <NavigationBar darkTheme={darkTheme}/> }
      { authorized && renderAccauntInfo()}
      { !authorized && renderEntranceLinks()}
    </header>
  );
}
