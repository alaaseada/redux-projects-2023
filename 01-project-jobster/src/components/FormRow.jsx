import React from 'react';

const FormRow = ({ labelText, type, name, value, handleFn }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className='form-input'
        value={value}
        onChange={handleFn}
      />
    </div>
  );
};

export default FormRow;
