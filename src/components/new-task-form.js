import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {

    state = {
        label: '',
    }

    static defaultProps = {
        onItemAdded: () => {}
    }

    static propTypes = {
        onItemAdded: PropTypes.func
    }

    onLabelChahge = (event) => {
        this.setState({
            label: event.target.value,
        })
    }

    onSubmit = (event) => {

        const { label } = this.state;

        const { onItemAdded } = this.props;

        event.preventDefault();
        onItemAdded(label)
        this.setState({
            label: '',
        })
    }

    render() {

        const { label } = this.state

        return (
            <header className="header">
                <h1>todos</h1>
                <form
                    onSubmit={this.onSubmit}>
                    <input className="new-todo"
                        required
                        placeholder="What needs to be done?" 
                        onChange={this.onLabelChahge}
                        value={label} />
                </form>
            </header>
        );
    }
};

