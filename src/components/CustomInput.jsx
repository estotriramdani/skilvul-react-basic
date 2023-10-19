import PropTypes from 'prop-types';
/* 
Aturan dalam membuat props.
1. Props harus berupa object
*/

const CustomInput = (props) => {
  /* 
  {
    value: '',
    placeholder: '',
    onChange: undefined
  }
  */
  return (
    <input
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className="
      block
      border 
      border-slate-500 
      rounded py-2 px-3 
      outline-none
      focus:ring-1
      ring-slate-500
      ring-offset-1
      mb-2
      "
    />
  );
};

// assign data type for autocompletion in Code Editor. Next it will be better if we use typescript
CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomInput;
