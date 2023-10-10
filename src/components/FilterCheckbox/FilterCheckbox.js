import './FilterCheckbox.css'

export  default function FilterCheckbox({value, setValue, label}) {

  function onClick(evt) {
    evt.stopPropagation();
    setValue(!value);
  }

  return (
    <label className='filter-checkbox' onClick={onClick}>
      <div className='filter-checkbox__container' >
        <div className={'filter-checkbox__bacground ' + (value ? 'filter-checkbox__bacground_on' : '')}>
          <div className={'filter-checkbox__slider ' + (value ? 'filter-checkbox__slider_on' : '')}/>
        </div>
      </div>
      {label}
    </label>
  );
}