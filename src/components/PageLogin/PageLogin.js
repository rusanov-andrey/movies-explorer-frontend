import Header from '../Header/Header';
import Login from '../Login/Login';

import './PageLogin.css'

export default function PageLogin() {
  return (
    <div className='page-login'>
      <Header authorized={false} darkTheme={false} short={true}/>
      <Login />
    </div>
  );
}
