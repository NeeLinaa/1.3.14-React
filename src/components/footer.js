import React from 'react';
import TasksFilter from './tasks-filter'

const Footer = ({ leftToDo, filter, onFilterChange, deleteCompletedItem, taskData }) => {
    return (
        <footer className="footer">
            <span className="todo-count">{leftToDo} items left</span>
            <TasksFilter filter={filter}
                onFilterChange={onFilterChange} />
            <button className="clear-completed"
                onClick={() => deleteCompletedItem()} >Clear completed</button>
        </footer>
    )
}

export default Footer;