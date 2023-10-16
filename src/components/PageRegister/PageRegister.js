import Header from '../Header/Header';
import Register from '../Register/Register';

import './PageRegister.css'

export default function PageRegister() {
  return (
    <div className='page-register'>
      <Header authorized={false} darkTheme={false} short={true}/>
      <Register />
    </div>
  );
}
