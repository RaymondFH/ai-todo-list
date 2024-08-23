import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;