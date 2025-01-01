import React from 'react';
import './TaskSearch.css'; 

const TaskSearch = ({ searchTerm, onSearch }) => (
  <div className="task-search-container">
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default TaskSearch;
