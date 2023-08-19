const FormRowSelect = ({ labelText, name, value, options, handleFn }) => {
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor='status'>
        {labelText || name}
      </label>
      <select
        name={name}
        className='form-select'
        value={value}
        onChange={handleFn}
      >
        {options?.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
