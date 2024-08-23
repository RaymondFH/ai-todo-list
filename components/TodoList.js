import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;