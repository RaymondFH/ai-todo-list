import React from 'react';

const TodoItem = ({ task }) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg">{task.title}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {task.category}
        </span>
      </div>
      {task.description && (
        <p className="text-gray-600 mt-2">{task.description}</p>
      )}
    </li>
  );
};

export default TodoItem;