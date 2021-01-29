import React from 'react';

import Task from './task'

const TaskList = ({ props, onDeleted, onToggleCompleted, toggleTimer }) => {

    const timerStart = true;
    const timerPause = false;

    const elem = props.map(item => {
        console.log(item)
        const { id, ...itemProps } = item;

        return (
            <div key={id} className="todo-list">
                <Task
                    className='new-todo-form__timer'
                    min={item.min}
                    sec={item.sec}
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleCompleted={() => onToggleCompleted(id)}
                    toggleTimerStart={() => toggleTimer(id, timerStart)}
                    toggleTimerPause={() => toggleTimer(id, timerPause)}
                     />
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
