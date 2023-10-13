import React from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

import './HelloForm.css'

export  default function HelloForm({name, title, buttonText, info, linkText, linkAddr, onSubmit, children}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation('input__error_visible');
  const subminButtonRef = React.useRef();

  function handleFormChange(evt) {
    const validStatus = handleChange(evt);
    subminButtonRef.current.disabled = !validStatus;
  }

  function handleFormSubmit(evt) {
    onSubmit(evt);
    resetForm();
  }

  return (
    <form className='hello-form' name={name} nethod='POST' noValidate onSubmit={handleFormSubmit} onChange={handleFormChange}>
      <div className='hello-form__field-container'>
        <h1 className='hello-form__title'>{title}</h1>
        {children}
      </div>
      <div className='hello-form__button-container'>
        <button ref={subminButtonRef} className='hello-form__submit' type='submit'>{buttonText}</button>
        <p className='hello-form__info'>{info + ' '}<Link className='hello-form__link' to={linkAddr}>{linkText}</Link></p>
      </div>
    </form>
  );
}
