import React from 'react';

import HelloForm from '../HelloForm/HelloForm';
import Input from '../Input/Input';

import './Login.css'

import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { validateName } from '../../validators/nameValidator';
import { validateEmail } from '../../validators/emailValidator';
import { login } from './LoginApi';


export  default function Login() {
  const { mainApi, loginAttempt, setLoginAttempt } = React.useContext(AppContext);
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext)

  function onSubmit(evt, values) {
    evt.preventDefault();

    return login(mainApi, values.email, values.password);
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

  function onSuccess(data) {
    setCurrentUser(data);
    setLoginAttempt(loginAttempt + 1);
  }


  return (
    <main className='login'>
      <HelloForm 
            name='signin' 
            title='Рады видеть!' 
            buttonText='Войти' 
            info='Ещё не зарегистрированы?' 
            linkText='Регистрация' 
            linkAddr='/signup' 
            validate={validate} 
            onSubmit={onSubmit}
            successLink='/movies'
            onSuccess={onSuccess}
        >
        <Input title='E-mail' type='email' name='email' placeholder='your@mail.addr' required={true}/>
        <Input title='Пароль' type='password' name='password' placeholder='* * *' minLength={8} required={true}/>
      </HelloForm>
    </main>
  );
}
