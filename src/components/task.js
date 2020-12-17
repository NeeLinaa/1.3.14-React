import React, { Component } from 'react';

export default class Task extends Component {

    render() {

        const { label, onDeleted, onToggleCompleted, completed } = this.props;

        let classNames = ''
        if (completed) {
            classNames += ' completed';
        }

        return (

            <li className={classNames}>
                <div className="view">
                    <input className="toggle" type="checkbox"
                        onClick={onToggleCompleted} />
                    <label>
                        <span className="description">{label}</span>
                        <span className="created"></span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleted}></button>
                </div>
            </li>

        )
    }
}
