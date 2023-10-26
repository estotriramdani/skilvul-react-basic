import CustomButton from './CustomButton';
import PropTypes from 'prop-types';

const TodoCard = ({ todo, createdAt }) => {
  return (
    <div className="flex justify-between p-3 border rounded-lg shadow-sm hover:text-gray-700 hover:bg-gray-100 transition-all duration-100 items-center">
      <div>
        <p>{todo}</p>
        <p>{createdAt}</p>
      </div>
      <CustomButton>🗑️</CustomButton>
    </div>
  );
};

TodoCard.propTypes = {
  todo: PropTypes.string,
  createdAt: PropTypes.string,
};

export default TodoCard;
