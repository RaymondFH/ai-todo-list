import React from 'react';

const TodoItem = ({ task }) => {
  const categoryColors = {
    Work: 'bg-blue-100 text-blue-800',
    Personal: 'bg-green-100 text-green-800',
    Shopping: 'bg-yellow-100 text-yellow-800',
    Health: 'bg-red-100 text-red-800',
    Finance: 'bg-purple-100 text-purple-800',
  };

  return (
    <li className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition duration-200">
      <div className="flex items-center justify-between">
        <span className="text-lg text-gray-700">{task.title}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category] || 'bg-gray-100 text-gray-800'}`}>
          {task.category}
        </span>
      </div>
      {task.description && (
        <p className="text-gray-500 mt-2 text-sm">{task.description}</p>
      )}
    </li>
  );
};

export default TodoItem;