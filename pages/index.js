import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import AICategorizationComponent from '../components/AICategorizationComponent';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    if (data.success) {
      setTasks(data.data);
    }
  };

  const addTask = async (task) => {
    const res = await fetch('/api/categorize-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (data.success) {
      setTasks([...tasks, data.data]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">AI-Powered Todo List</h1>
          <AICategorizationComponent onCategorize={addTask} />
          <TodoList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}