import { NavLink } from 'react-router-dom';
import './NavigationBar.css'

export default function NavigationBar({darkTheme }) {
  function calculeteClassName(isActive, darkTheme) {
    return (isActive ? `navigation-bar__text ${darkTheme ? 'navigation-bar__text_dark' : ''}` : `navigation-bar__link  ${darkTheme ? 'navigation-bar__link_dark' : ''}`);
  }
  return (
    <nav className='navigation-bar'>
      <NavLink className={({isActive}) => calculeteClassName(isActive, darkTheme)} to='/movies'>Фильмы</NavLink>
      <NavLink className={({isActive}) => calculeteClassName(isActive, darkTheme)} to='/saved-movies'>Сохранённые фильмы</NavLink>
    </nav>
  );
}
