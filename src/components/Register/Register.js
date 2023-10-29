import React from 'react';

import HelloForm from '../HelloForm/HelloForm';
import Input from '../Input/Input';

import './Register.css'

import { AppContext } from '../../contexts/AppContext';

import { registerUser } from './RegisterApi';
import { validateEmail } from '../../validators/emailValidator'

export  default function Register() {
  const { mainApi } = React.useContext(AppContext);

  function onSubmit(evt, values) {
    evt.preventDefault();
    console.log(values.email, values.password, values.name);
    return registerUser(mainApi, values.email, values.password, values.name);
  }

  function validate(name, value) {
    if(name === 'email') {
      return validateEmail(value);
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
            successLink='/signin'
        >
        <Input title='Имя' type='text' name='name' placeholder='Витя' minLength={2} maxLength={30} required={true}/>
        <Input title='E-mail' type='email' name='email' placeholder='your@mail.addr' required={true}/>
        <Input title='Пароль' type='password' name='password' placeholder='* * *' minLength={8} required={true}/>
      </HelloForm>
    </main>
  );
}
