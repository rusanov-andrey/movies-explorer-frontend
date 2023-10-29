import React from "react";

export function useFormAndValidation(errorClassName, defaulValues, customValidate) {
  const [ values, setValues ] = React.useState(defaulValues || {});
  const [ errors, setErrors ] = React.useState({});
  const [ isValid, setIsValid ] = React.useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target
    const browserValidStatus = e.target.closest('form').checkValidity();
    let errorMessage = e.target.validationMessage
    setValues({...values, [name]: value });
    let customValidMessage = '';
    if(customValidate) {
      customValidMessage = customValidate(name, value);
    }

    if(customValidMessage) {
      errorMessage = customValidMessage;
    }

    setErrors({...errors, [name]: errorMessage});

    const validStatus = browserValidStatus && (customValidMessage.length === 0);
    setIsValid(validStatus);

    if(e.target.nextSibling) {
      e.target.nextSibling.textContent = errorMessage;
      if(errorMessage) {
        e.target.nextSibling.classList.add(errorClassName);
      } 
      else {
        e.target.nextSibling.classList.remove(errorClassName);
      }
    }

    return validStatus;
  };



  const resetForm = React.useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}
