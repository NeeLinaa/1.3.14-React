import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'

const Task = ({ label, onDeleted, onToggleCompleted, completed, createdTask }) => {

    let classNames = ''
        if (completed) {
            classNames += ' completed';
        }
    return(
        <li className={classNames}>
                <div className="view">
                    <label htmlFor ="a" >
                    <input id="a" name='a' className="toggle" type="checkbox"
                         onClick={onToggleCompleted} />
                        <span className="description">{label}</span>
                        <span className="created">{formatDistanceToNow(createdTask,
                            { addSuffix: true, includeSeconds: true })}</span>
                    </label>
                    <button label='Button' type='button'
                            className="icon icon-edit" />
                    <button label='Button' type='button'
                        className="icon icon-destroy"
                        onClick={onDeleted} />
                </div>
            </li>
    )
    
}

Task.defaultProps = {
    label: '',
    onDeleted: () => {},
    onToggleCompleted: () => {},
    completed: false,
    createdTask: {}
}

Task.propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    completed: PropTypes.bool,
    createdTask: PropTypes.instanceOf(Date)
}

export default Task;
