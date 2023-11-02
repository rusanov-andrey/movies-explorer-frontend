import React from 'react';

import { useFormAndValidation } from '../../hooks/useFormAndValidation'

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

import './SearchForm.css'

export  default function SearchForm({filmName, shortTime, onSubmit, searchResultsWasLoaded }) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation('', {film: filmName}, undefined, true);
  
  const [_shortTime, setShortTime] = React.useState(shortTime);
  const [submited, setSubmited] = React.useState(searchResultsWasLoaded === true);

  const submitButtonRef = React.useRef();

  function handleFormChange(evt) {
    const validStatus = handleChange(evt);
    submitButtonRef.current.disabled = !validStatus;
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    submitButtonRef.current.disabled = true;
    console.log(`search handleFormSubmit ${JSON.stringify(values)}, ${_shortTime}`);
    onSubmit(values.film, _shortTime);
    setSubmited(true);
  }

  function handleShortTimeChanged(value) {
    setShortTime(value);
    if(submited) {
      onSubmit(values.film, value);
    }
    //if(isValid)
    //  submitButtonRef.current.disabled = false;
  }

  React.useEffect(() => {
    setValues({...values, film: filmName})
  }, [filmName]);

  React.useEffect(() => {
    setTimeout(() => {
      submitButtonRef.current.disabled = true;
    }, 0);
  }, [])

  React.useEffect(() => {
    setSubmited(searchResultsWasLoaded);
  }, [searchResultsWasLoaded]);

  return (
    <form className='search-form' name='movie' method='POST'>
      <div className='search-form__container'>
        <div className='search-form__input-container'>
          <input className='search-form__input' type='text' name='film' placeholder='Фильм' required value={values.film} onChange={handleFormChange}/>
          <button ref={submitButtonRef} className='search-form__button' onClick={handleFormSubmit}>Найти</button>
        </div>
        <p className='search-form__error'></p>
      </div>
      <div className='search-form__filter-container'>
        <FilterCheckbox value={_shortTime} setValue={handleShortTimeChanged} label='Короткометражки'/>
      </div>
    </form>
  );
}
