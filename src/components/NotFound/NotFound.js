import { useNavigate } from 'react-router-dom';

import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className='notfound'>
      <div className='notfound__container'>
        <h1 className='notfound__title'>404</h1>
        <p className='notfound__message'>Страница не найдена</p>
        <button className='notfound__back' onClick={() => navigate(-1)}>Назад</button>
      </div>
    </main>
  );
}
