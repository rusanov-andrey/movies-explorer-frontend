import React from "react";

export function useFormAndValidation(errorClassName, defaulValues, customValidate, useParentSibling) {
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

    const errorContainer = useParentSibling ? e.target.parentElement.nextSibling : e.target.nextSibling;
    if(errorContainer) {
      errorContainer.textContent = errorMessage;
      if(errorClassName) {
        if(errorMessage) {
          errorContainer.classList.add(errorClassName);
        } 
        else {
          errorContainer.classList.remove(errorClassName);
        }
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
