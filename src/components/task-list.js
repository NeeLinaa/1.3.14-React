import React from 'react';
import PropTypes from 'prop-types';

import Task from './task';

const TaskList = ({ todos, onDeleted, onToggleCompleted, toggleTimer }) => {
  const timerStart = true;
  const timerPause = false;

  const elem = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <div key={id} className="todo-list">
        <Task
          className="new-todo-form__timer"
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          toggleTimerStart={() => toggleTimer(id, timerStart)}
          toggleTimerPause={() => toggleTimer(id, timerPause)}
        />
      </div>
    );
  });

  return <ul className="todo-list">{elem}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  toggleTimer: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: '',
      completed: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  toggleTimer: PropTypes.func,
};

export default TaskList;
