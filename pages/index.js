import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import AICategorizationComponent from '../components/AICategorizationComponent';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // In a real application, you'd fetch tasks from an API here
    // For now, we'll just use some dummy data
    setTasks([
      { id: 1, title: 'Buy groceries', category: 'Shopping' },
      { id: 2, title: 'Finish project report', category: 'Work' },
    ]);
  }, []);

  const addTask = (task) => {
    // In a real application, you'd send this to an API
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI-Powered Todo List</h1>
      <AICategorizationComponent onCategorize={addTask} />
      <TodoList tasks={tasks} />
    </div>
  );
}