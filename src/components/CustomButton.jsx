import PropTypes from 'prop-types';

const CustomButton = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className="px-3 py-2 block bg-slate-700 text-slate-100 rounded"
    >
      {props.children}
    </button>
  );
};

// assign data type for autocompletion in Code Editor. Next it will be better if we use typescript
CustomButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomButton;
