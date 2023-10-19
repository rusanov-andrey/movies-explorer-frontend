import { NavLink } from 'react-router-dom';
import './NavigationBar.css'

export default function NavigationBar({linkInfo, darkTheme }) {
  function calculeteClassName(isActive, darkTheme) {
    return (isActive ? `navigation-bar__text ${darkTheme ? 'navigation-bar__text_dark' : ''}` : `navigation-bar__link  ${darkTheme ? 'navigation-bar__link_dark' : ''}`);
  }
  return (
    <div className='navigation-bar'>
      <nav className='navigation-bar__menu'>
        {linkInfo.map((item) => <NavLink key={item.addr} className={({isActive}) => calculeteClassName(isActive, darkTheme)} to={item.addr}>{item.text}</NavLink>)}
      </nav>
    </div>
  );
}
