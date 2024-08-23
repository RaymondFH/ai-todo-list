import React, { useState } from 'react';

const AICategorizationComponent = ({ onCategorize }) => {
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/categorize-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      const data = await response.json();
      onCategorize({ title: task, category: data.category });
      setTask('');
    } catch (error) {
      console.error('Error categorizing task:', error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || !task}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default AICategorizationComponent;