import { useContext, useState } from 'react';
import AppContext from '../contexts/AppContext';
import TodoCard from '../components/TodoCard';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const HomePage = () => {
  const ctx = useContext(AppContext);
  const [todo, setTodo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await ctx.handleAddTodo(todo);
    setTodo('');
  };

  return (
    <div className="pt-20 px-6 text-white">
      <form onSubmit={handleSubmit} className="mb-4">
        <CustomInput value={todo} onChange={(event) => setTodo(event.target.value)} />
        <CustomButton>Add Todo</CustomButton>
      </form>
      <div className="flex gap-3 flex-col-reverse">
        {ctx.todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo.todo} createdAt={todo.createdAt} id={todo.id} />
        ))}
        {ctx.isLoading && (
          <div className="w-full h-20 animate-pulse bg-gray-400 flex-shrink-0 rounded-lg"></div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
