import React from "react";

export function useFormAndValidation(errorClassName, defaulValues) {
  const [ values, setValues ] = React.useState(defaulValues || {});
  const [ errors, setErrors ] = React.useState({});
  const [ isValid, setIsValid ] = React.useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target
    const validStatus = e.target.closest('form').checkValidity();
    const errorMessage = e.target.validationMessage
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: errorMessage});
    setIsValid(validStatus);

    e.target.nextSibling.textContent = e.target.validationMessage;
    if(errorMessage) {
      e.target.nextSibling.classList.add(errorClassName);
    } 
    else {
      e.target.nextSibling.classList.remove(errorClassName);
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
