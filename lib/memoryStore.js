let tasks = [];
let id = 0;

export default {
  getAllTasks: () => tasks,
  addTask: (task) => {
    const newTask = { ...task, id: ++id };
    tasks.push(newTask);
    return newTask;
  },
  updateTask: (id, updatedTask) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      return tasks[index];
    }
    return null;
  },
  deleteTask: (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    return false;
  }
};