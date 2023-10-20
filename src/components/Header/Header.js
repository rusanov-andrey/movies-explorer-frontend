import React from "react";
import NavigationBar from '../NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';

import './Header.css'

const linkInfo = [{addr: '/movies', text: 'Фильмы'}, {addr: '/saved-movies', text: 'Сохранённые фильмы'}];

export default function Header({authorized, darkTheme, short}) {
  const menuRef = React.useRef();

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

  function handleMenuClick(evt) {
    menuRef.current.classList.add('header__navigation-bar-popup_visible');
  }

  function handleCloseClick(evt) {
    menuRef.current.classList.remove('header__navigation-bar-popup_visible');
  }

  return (
    <header className= {'header ' + (darkTheme ? 'header_dark ' : '') + (short ? 'header_short' : '')}>
      <Link className='header__logo-link' to='/'>
        <div className='header__logo' />
      </Link>
      <div className='header__navigation-bar header__navigation-bar_long'>
        { !short && authorized && <NavigationBar linkInfo={linkInfo} darkTheme={darkTheme}/> }
      </div>
      { !short && authorized && renderAccauntInfo()}
      { !short && !authorized && renderEntranceLinks()}
      { authorized && <div className={'header__menu-button ' + (darkTheme ? 'header__menu-button_dark' : '')} onClick={handleMenuClick}>≡</div> }
      <div ref={menuRef} className='header__navigation-bar-popup'>
        <div className='header__navigation-bar-overlay'>
          <div className='header__navigation-bar-group'>
            <button className='header__navigation-bar-close' onClick={handleCloseClick}></button>
            <NavigationBar linkInfo={[{addr: '/', text: 'Главная'}, ...linkInfo]} darkTheme={darkTheme}/>
          </div>
          <Link className={'header__account-button header__account-button_navigation ' + (darkTheme ? 'header__account-button_accent' : '')} to='/profile'><span className='header__account-text'>Аккаунт</span><div className='header__account-icon'></div></Link>
        </div>
      </div>
    </header>
  );
}
