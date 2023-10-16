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
        <Input title='Имя' type='text' name='name' placeholder='Витя' required={true}/>
        <Input title='E-mail' type='text' name='email' placeholder='your@mail.addr' required={false}/>
        <Input title='Пароль' type='text' name='password' placeholder='* * *'/>
      </HelloForm>
    </main>
  );
}
