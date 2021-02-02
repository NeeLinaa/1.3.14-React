import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from './tasks-filter';

const Footer = ({ leftToDo, filter, onFilterChange, deleteCompletedItem }) => (
  <footer className="footer">
    <span className="todo-count">{leftToDo} items left</span>
    <TasksFilter filter={filter} onFilterChange={onFilterChange} />
    <button type="button" className="clear-completed" onClick={() => deleteCompletedItem()}>
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  leftToDo: 0,
  filter: () => {},
  onFilterChange: () => {},
  deleteCompletedItem: () => {},
};

Footer.propTypes = {
  leftToDo: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  deleteCompletedItem: PropTypes.func,
};

export default Footer;
