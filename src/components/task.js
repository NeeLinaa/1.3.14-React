import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  label,
  onDeleted,
  onToggleCompleted,
  completed,
  created,
  min,
  sec,
  toggleTimerStart,
  toggleTimerPause,
}) => {
  let classNames = '';
  if (completed) {
    classNames += ' completed';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input name="a" className="toggle" type="checkbox" onClick={onToggleCompleted} />
        <label htmlFor="a">
          <span className="title">{label}</span>
          <span className="description">
            <button label="Button" type="button" onClick={toggleTimerStart} className="icon icon-play" />
            <button label="Button" type="button" onClick={toggleTimerPause} className="icon icon-pause" />
            <span className="timer">
              {min}:{sec}
            </span>
          </span>
          <span className="description">{formatDistanceToNow(created, { addSuffix: true, includeSeconds: true })}</span>
        </label>
        <button label="Button" type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  );
};

Task.defaultProps = {
  label: '',
  onDeleted: () => {},
  onToggleCompleted: () => {},
  toggleTimerStart: () => {},
  toggleTimerPause: () => {},
  completed: false,
  created: {},
  min: 0,
  sec: 0,
};

Task.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  toggleTimerStart: PropTypes.func,
  toggleTimerPause: PropTypes.func,
  completed: PropTypes.bool,
  created: PropTypes.instanceOf(Date),
  min: PropTypes.number,
  sec: PropTypes.number,
};

export default Task;
