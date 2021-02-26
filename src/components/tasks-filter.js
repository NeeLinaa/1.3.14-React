import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];
  const btns = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={`${name} ${clazz}`} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{btns}</ul>;
};

TasksFilter.defaultProps = {
  filter: '',
  onFilterChange: () => {},
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TasksFilter;
