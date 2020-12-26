import React from 'react';
import PropTypes from 'prop-types';

import Task from './task'

const TaskList = ({ todos, onDeleted, onToggleCompleted }) => {

    const elem = todos.map(item => {
        const { id, ...itemProps } = item;
        return (
            <div key={Math.random() * 10}>
                <Task
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleCompleted={() => onToggleCompleted(id)} />
            </div>
        )
    })

    return (
        <ul className="todo-list">
            {elem}
        </ul>
    )
}

TaskList.defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        label: '',
        completed: PropTypes.bool,
        id: PropTypes.number
    })),
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func
}

export default TaskList;
