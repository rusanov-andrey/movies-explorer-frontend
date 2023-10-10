import React from "react";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

import './SearchForm.css'

export  default function SearchForm() {
  const [shortTime, setShortTime] = React.useState(false);

  return (
    <form className='search-form' name='movie' method='POST'>
      <div className='search-form__input-container'>
        <input className='search-form__input' type='text' placeholder='Фильм'/>
        <input className='search-form__button' type='button' value='Найти'/>
      </div>
      <FilterCheckbox value={shortTime} setValue={setShortTime} label='Короткометражки'/>
    </form>
  );
}
