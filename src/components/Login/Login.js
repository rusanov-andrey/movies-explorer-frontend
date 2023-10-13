import HelloForm from '../HelloForm/HelloForm';
import Input from '../Input/Input';

import './Login.css'

export  default function Login() {
  function onSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className='login'>
      <HelloForm name='signin' title='Рады видеть!' buttonText='Войти' info='Ещё не зарегистрированы?' linkText='Регистрация' linkAddr='/signup' onSubmit={onSubmit}>
        <Input title='E-amil' type='text' name='email' placeholder='placeholder' required={false}/>
        <Input title='Пароль' type='text' name='password' placeholder='placeholder'/>
      </HelloForm>
    </main>
  );
}
