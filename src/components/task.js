import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {

    state = {
        
    }

    render() {

        const { label, onDeleted, onToggleCompleted, completed, created, min, sec, toggleTimerStart, toggleTimerPause } = this.props;
        
        let classNames = '';
        if (completed) {
            classNames += ' completed';
        }

        return (

            <li className={classNames}>
                <div className="view">
                    <input className="toggle" type="checkbox"
                        onClick={onToggleCompleted} />
                    <label>
                        <span className="title">{label}</span>
                        <span className="description">
                            <button 
                                onClick={toggleTimerStart}
                                className="icon icon-play" 
                            ></button>
                            <button 
                                onClick={toggleTimerPause}
                                className="icon icon-pause"
                            ></button>
                            <span className="timer">{min}:{sec}</span>
                        </span>
                        <span className="description">{ formatDistanceToNow(created, { addSuffix: true, includeSeconds: true }) }</span>
                    </label>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleted}></button>
                </div>
            </li>

        )
    }
}
