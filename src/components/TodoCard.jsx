import { useContext } from 'react';
import CustomButton from './CustomButton';
import PropTypes from 'prop-types';
import AppContext from '../contexts/AppContext';

const TodoCard = ({ id, todo, createdAt }) => {
  const ctx = useContext(AppContext);

  return (
    <div className="flex justify-between p-3 border rounded-lg shadow-sm hover:text-gray-700 hover:bg-gray-100 transition-all duration-100 items-center">
      <div>
        <p>{todo}</p>
        <p>{createdAt}</p>
      </div>
      <CustomButton onClick={() => ctx.handleDeleteTodo(id)}>🗑️</CustomButton>
    </div>
  );
};

TodoCard.propTypes = {
  id: PropTypes.string,
  todo: PropTypes.string,
  createdAt: PropTypes.string,
};

export default TodoCard;
