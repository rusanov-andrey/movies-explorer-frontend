import Header from '../Header/Header';
import Profile from '../Profile/Profile';

import './PageProfile.css'

export default function PageProfile() {
  return (
    <div className='page-profile'>
      <Header authorized={true} darkTheme={false} short={false}/>
      <Profile />
    </div>
  );
}
