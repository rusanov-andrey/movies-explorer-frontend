import React from 'react';
import { useNavigate } from 'react-router-dom';

import HelloForm from '../HelloForm/HelloForm';
import Input from '../Input/Input';

import './Register.css'

import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { registerUser, login } from './RegisterApi';
import { validateName } from '../../validators/nameValidator';
import { validateEmail } from '../../validators/emailValidator'

export  default function Register() {
  const { mainApi } = React.useContext(AppContext);
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext)
  const navigate = useNavigate();

  let email = null;
  let password = null;

  function onSubmit(evt, values) {
    email = values.email;
    password = values.password;

    evt.preventDefault();
    console.log(values.email, values.password, values.name);
    return registerUser(mainApi, values.email, values.password, values.name);
  }

  function onSuccess(data) {
    login(mainApi, email, password)
      .then(() => {
        setCurrentUser(data);
        setTimeout(() => {navigate('/movies')}, 0);
      })
      .catch(err => console.log);
  }

  function validate(name, value) {
    if(name === 'email') {
      return validateEmail(value);
    }

    if(name === 'name') {
      return validateName(value);
    }

    return '';
  }

  return (
    <main className='register'>
      <HelloForm 
            name='signup' 
            title='Добро пожаловать!' 
            buttonText='Зарегистрироваться' 
            info='Уже зарегистрированы?' 
            linkText='Войти' 
            linkAddr='/signin' 
            validate={validate} 
            onSubmit={onSubmit}
            onSuccess={onSuccess}
        >
        <Input title='Имя' type='text' name='name' placeholder='Витя' minLength={2} maxLength={30} required={true}/>
        <Input title='E-mail' type='email' name='email' placeholder='your@mail.addr' required={true}/>
        <Input title='Пароль' type='password' name='password' placeholder='* * *' minLength={8} required={true}/>
      </HelloForm>
    </main>
  );
}
