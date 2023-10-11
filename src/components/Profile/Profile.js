import React from 'react';

import './Profile.css'

export  default function Profile() {
  const [editMode, setEditMode] = React.useState(false)

  function renderForm() {
    return (
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, AAA</h1>
        <form className='profile__info' name='profile' method='POST'>
          <div className='profile__info-item'>
            <label className='profile__info-title'>Имя</label>
            <input className='profile__info-editor' type='text' defaultValue='Вася'/>
          </div>
          <div className='profile__info-item'>
            <label className='profile__info-title'>E-mail</label>
            <input className='profile__info-editor' type='text' defaultValue='aaa@bbb.ru'/>
          </div>
          <input className='profile__save-button' type='button' value='Сохранить' onClick={() => setEditMode(false)}/>
        </form>
      </div>
    );
  }

  function renderView() {
    return (
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, AAA</h1>
        <div className='profile__info'>
          <div className='profile__info-item'>
            <div className='profile__info-title'>Имя</div>
            <div className='profile__info-data'>Вася</div>
          </div>
          <div className='profile__info-item'>
            <div className='profile__info-title'>E-mail</div>
            <div className='profile__info-data'>aaa@bbb.ru</div>
          </div>
          <input className='profile__edit-button' type='button' value='Редактировать' onClick={() => setEditMode(true)}/>
          <input className='profile__exit-button' type='button' value='Выйти из акаунта'/>
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
