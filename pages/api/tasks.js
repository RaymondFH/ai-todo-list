import memoryStore from '../../lib/memoryStore';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const tasks = memoryStore.getAllTasks();
      res.status(200).json({ success: true, data: tasks });
      break;
    case 'POST':
      const newTask = memoryStore.addTask(req.body);
      res.status(201).json({ success: true, data: newTask });
      break;
    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}