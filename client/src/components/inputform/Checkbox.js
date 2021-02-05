import React, { useState, useEffect } from 'react';

export default function Checkbox(props) {
  const { name, id, value, onChange, text, current, formDefault } = props;

  const [check, setCheck] = useState(value);

  // if a form was selected for update, set checkbox values, otherwise set to false
  useEffect(() => {
    if (current !== null) {
      setCheck(current);
    } else {
      setCheck(formDefault);
    }
  }, [current, formDefault]);

  const onClick = () => {
    setCheck(!check);
  };

  return (
    <div className='custom-control custom-checkbox'>
      <input
        name={name}
        type='checkbox'
        className='custom-control-input'
        id={id}
        value={value}
        onChange={onChange}
        checked={check}
        onClick={onClick}
      />
      <label className='custom-control-label' htmlFor={id}>
        {text}
      </label>
    </div>
  );
}
