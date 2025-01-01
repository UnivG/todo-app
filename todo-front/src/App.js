import React, { useState, useEffect } from 'react';
import TaskForm from './components/form/TaskForm';
import TaskList from './components/list/TaskList';
import TaskSearch from './components/search/TaskSearch';
import './App.css'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddOrEdit = (task) => {
    if (task.id) {
      fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
        .then(() => setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))); 
    } else {
      fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((newTask) => setTasks((prev) => [...prev, newTask])); 
    }
    setEditTask(null); 
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks((prev) => prev.filter((task) => task.id !== id))); 
  };

  const handleToggle = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
  
    task.isDone = !task.isDone;
  
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: task.id, 
        taskName: task.taskName,
        description: task.description,
        deadline: task.deadline,
        isDone: task.isDone 
      }),
    })
      .then((response) => {
        if (response.ok) {
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === id ? { ...t, isDone: task.isDone } : t
            )
          );
        } else {
          console.error("Failed to update task status");
        }
      })
      .catch((err) => console.error("Error updating task status:", err));
  };
  
  return (
    <div className="app-container">
      <h1 className="app-header">To-Do List</h1>
      <TaskSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="task-form-container">
        <TaskForm onSubmit={handleAddOrEdit} initialData={editTask} />
      </div>
      <div className="task-list-container">
        <TaskList
          tasks={tasks.filter((task) =>
            task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={setEditTask} 
        />
      </div>
    </div>
  );
};

export default App;
