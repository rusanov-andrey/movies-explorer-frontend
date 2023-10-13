import HelloForm from '../HelloForm/HelloForm';
import Input from '../Input/Input';

import './Register.css'

export  default function Register() {
  function onSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className='register'>
      <HelloForm name='signup' title='Добро пожаловать!' buttonText='Зарегистрироваться' info='Уже зарегистрированы?' linkText='Войти' linkAddr='/signin' onSubmit={onSubmit}>
        <Input title='Имя' type='text' name='name' placeholder='placeholder' required={true}/>
        <Input title='E-amil' type='text' name='email' placeholder='placeholder' required={false}/>
        <Input title='Пароль' type='text' name='password' placeholder='placeholder'/>
      </HelloForm>
    </main>
  );
}
