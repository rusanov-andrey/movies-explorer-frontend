import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import { useNavigate } from 'react-router-dom';

import './Profile.css'

import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { updateProfile, logout } from './ProfileApi'
import { validateName } from '../../validators/nameValidator';
import { validateEmail } from '../../validators/emailValidator'


function validate(name, value) {
  if(name === 'email') {
    return validateEmail(value);
  }

  if(name === 'name') {
    return validateName(value);
  }

  return '';
}


export  default function Profile() {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation('', currentUser, validate, true);
  const submitButtonRef = React.useRef();

  const { mainApi, loginAttempt, setLoginAttempt } = React.useContext(AppContext);

  const [editMode, setEditMode] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')

  const [result, setResult] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  console.log(`Profile.currentUser ${JSON.stringify(currentUser)}`);
  console.log(`Profile.values ${JSON.stringify(values)}`);

  function handleFormChange(evt) {
    const validStatus = handleChange(evt);
    submitButtonRef.current.disabled = (!validStatus) && (currentUser.name !== values.name) && (currentUser.email !== values.email);
    setErrorMessage('');
    console.log(`Valid: ${validStatus}`)
    // for(let k in values) console.log(values[k]);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    submitButtonRef.current.disabled = true;
    updateProfile(mainApi, values.email, values.name)
      .then((data) => {
        resetForm();
        setErrorMessage('');
        submitButtonRef.current.disabled = false;
        setCurrentUser(data)
        setEditMode(false);
        setResult('Профиль успешно обновлён');
      })
      .catch(() => {
        submitButtonRef.current.disabled = true;
        setErrorMessage('При отправке данных произошла ошибка')    
      })
  }

  function onLogout() {
    console.log('logout');
    localStorage.clear();
    logout(mainApi)
      .then(() => {
        console.log('logout ok');
        navigate('/');
        setLoginAttempt(loginAttempt+1);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }

  function handleEdit(evt) {
    setResult('');
    setEditMode(true);
    setTimeout(() => { submitButtonRef.current.disabled = true;}, 0);
  }


  function renderForm() {
    return (
      <div className='profile__container'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}`}</h1>
        <form className='profile__info' name='profile' method='POST'>
          <div className='profile__info-item'>
            <div className='profile__input-container'>
              <label className='profile__info-title'>Имя</label>
              <input className='profile__info-editor' type='text' name='name' required minLength={2} maxLength={30} value={values.name} onChange={handleFormChange}/>
            </div>
            <p className='profile__editor-error'></p>
          </div>
          <div className='profile__info-item'>
            <div className='profile__input-container'>
              <label className='profile__info-title'>E-mail</label>
              <input className='profile__info-editor' type='text' name='email' required value={values.email} onChange={handleFormChange}/>
            </div>
            <p className='profile__editor-error'></p>
          </div>
          <p className='profile__error'>{errorMessage}</p>
          <button ref={submitButtonRef} className='profile__save-button' onClick={handleFormSubmit}>Сохранить</button>
        </form>
      </div>
    );
  }

  function renderView() {
    return (
      <div className='profile__container'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}`}</h1>
        <div className='profile__info'>
          <div className='profile__view-item'>
            <div className='profile__info-title'>Имя</div>
            <div className='profile__info-data'>{currentUser.name}</div>
          </div>
          <div className='profile__view-item'>
            <div className='profile__info-title'>E-mail</div>
            <div className='profile__info-data'>{currentUser.email}</div>
          </div>
          <p className='profile__result'>{result}</p>
          <input className='profile__edit-button' type='button' value='Редактировать' onClick={handleEdit}/>
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
