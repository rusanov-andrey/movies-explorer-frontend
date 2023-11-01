import React from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import { useNavigate } from 'react-router-dom';


import './HelloForm.css'

export  default function HelloForm({name, title, buttonText, info, linkText, linkAddr, validate, onSubmit, successLink, onSuccess, children}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation('input__error_visible', undefined, validate);
  const submitButtonRef = React.useRef();

  const [errorMessage, setErrorMessage] = React.useState('')

  const navigate = useNavigate();

  function handleFormChange(evt) {
    const validStatus = handleChange(evt);
    submitButtonRef.current.disabled = !validStatus;
    setErrorMessage('');
    console.log(`Valid: ${validStatus}`)
    // for(let k in values) console.log(values[k]);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    submitButtonRef.current.disabled = true;
    onSubmit(evt, values)
      .then((data) => {
        resetForm();
        setErrorMessage('');
        submitButtonRef.current.disabled = false;
        if(onSuccess) {
          onSuccess(data)
        }
        if(successLink) {
          navigate(successLink)
        }
      })
      .catch(() => {
        submitButtonRef.current.disabled = true;
        setErrorMessage('При отправке данных произошла ошибка')    
      })
  }

  React.useEffect(() => {
    setTimeout(() => {
      submitButtonRef.current.disabled = true;
    }, 0);
  }, []);

  return (
    <form className='hello-form' name={name} method='POST' noValidate onSubmit={handleFormSubmit} onChange={handleFormChange}>
      <div className='hello-form__field-container'>
        <h1 className='hello-form__title'>{title}</h1>
        {children}
      </div>
      <div className='hello-form__button-container'>
        <p className='hello-form__error'>{errorMessage}</p>
        <button ref={submitButtonRef} className='hello-form__submit' type='submit'>{buttonText}</button>
        <p className='hello-form__info'>{info + ' '}<Link className='hello-form__link' to={linkAddr}>{linkText}</Link></p>
      </div>
    </form>
  );
}
