import './Input.css'

export default function Input({title, type, name, placeholder, required, minLength, maxLength}) {
  return (
    <div className='input'>
      <p className='input__title'>{title}</p>
      <input className='input__input' name={name} type={type} placeholder={placeholder} required={required} minLength={minLength} maxLength={maxLength}/>
      <span className='input__error'></span>
    </div>
  );
}
