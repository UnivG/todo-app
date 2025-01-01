import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'isDone', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = sortedTasks.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  return (
    <div className="task-table-container">
      <p>Sort by pressing column name</p>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('taskName')}>Name {getSortArrow('taskName')}</th>
            <th onClick={() => handleSort('description')}>Description {getSortArrow('description')}</th>
            <th onClick={() => handleSort('deadline')}>Deadline {getSortArrow('deadline')}</th>
            <th onClick={() => handleSort('isDone')}>Done {getSortArrow('isDone')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task) => (
            <tr key={task.id} className={task.isDone ? 'done' : ''}>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{task.deadline}</td>
              <td>{task.isDone ? 'Yes' : 'No'}</td>
              <td className="action-buttons">
                <button className="mark-as-done" onClick={() => onToggle(task.id)}>
                  Mark as {task.isDone ? 'Undone' : 'Done'}
                </button>
                <button className="edit" onClick={() => onEdit(task)}>Edit</button>
                <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
