import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import { useNavigate } from 'react-router-dom';

import './Profile.css'

import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { updateProfile, logout } from './ProfileApi'

export  default function Profile() {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation('input__error_visible', currentUser, undefined);
  const subminButtonRef = React.useRef();

  const { mainApi, loginAttempt, setLoginAttempt } = React.useContext(AppContext);

  const [editMode, setEditMode] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')

  const navigate = useNavigate();

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  console.log(`Profile.currentUser ${JSON.stringify(currentUser)}`);
  console.log(`Profile.values ${JSON.stringify(values)}`);

  function handleFormChange(evt) {
    const validStatus = handleChange(evt);
    subminButtonRef.current.disabled = !validStatus;
    setErrorMessage('');
    console.log(`Valid: ${validStatus}`)
    // for(let k in values) console.log(values[k]);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    subminButtonRef.current.disabled = true;
    updateProfile(mainApi, values.email, values.name)
      .then((data) => {
        resetForm();
        setErrorMessage('');
        subminButtonRef.current.disabled = false;
        setCurrentUser(data)
        setEditMode(false);
      })
      .catch(() => {
        subminButtonRef.current.disabled = true;
        setErrorMessage('При отправке данных произошла ошибка')    
      })
  }

  function onLogout() {
    console.log('logout');
    logout(mainApi)
      .then(() => {
        console.log('logout ok');
        navigate('/signin');
        setLoginAttempt(loginAttempt+1);
      })
      .catch((err) => {
        console.log(err);
        navigate('/signin');
      });
  }



  function renderForm() {
    return (
      <div className='profile__container'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}`}</h1>
        <form className='profile__info' name='profile' method='POST'>
          <div className='profile__info-item'>
            <label className='profile__info-title'>Имя</label>
            <input className='profile__info-editor' type='text' name='name' value={values.name} onChange={handleFormChange}/>
          </div>
          <div className='profile__info-item'>
            <label className='profile__info-title'>E-mail</label>
            <input className='profile__info-editor' type='text' name='email' value={values.email} onChange={handleFormChange}/>
          </div>
          <p className='profile__error'>{errorMessage}</p>
          <button ref={subminButtonRef} className='profile__save-button' onClick={handleFormSubmit}>Сохранить</button>
        </form>
      </div>
    );
  }

  function renderView() {
    return (
      <div className='profile__container'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}`}</h1>
        <div className='profile__info'>
          <div className='profile__info-item'>
            <div className='profile__info-title'>Имя</div>
            <div className='profile__info-data'>{currentUser.name}</div>
          </div>
          <div className='profile__info-item'>
            <div className='profile__info-title'>E-mail</div>
            <div className='profile__info-data'>{currentUser.email}</div>
          </div>
          <input className='profile__edit-button' type='button' value='Редактировать' onClick={() => setEditMode(true)}/>
          <input className='profile__exit-button' type='button' value='Выйти из акаунта' onClick={onLogout}/>
        </div>
      </div>
    );
  }

  return (
    <main className='profile'>
      {editMode && renderForm()}
      {!editMode && renderView()}
    </main>
  );
}
