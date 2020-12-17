import React from 'react';

import Task from './task'

const TaskList = ({ props, onDeleted, onToggleCompleted }) => {

    const elem = props.map(item => {
        const { id, ...itemProps } = item;
        return (
            <div key={id}>
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

export default TaskList;
