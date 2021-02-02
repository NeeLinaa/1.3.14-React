import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func,
  };

  onChange = (event) => {
    const { target } = event;
    const { name } = target;
    switch (name) {
      case 'label':
        this.setState({
          label: target.value,
        });
        break;
      case 'min':
        this.setState({
          min: target.value,
        });
        break;
      case 'sec':
        this.setState({
          sec: target.value,
        });
        break;
      default:
        break;
    }
  };

  onSubmit = (event) => {
    const { label, min, sec } = this.state;
    const { onItemAdded } = this.props;
    event.preventDefault();
    onItemAdded(label, min, sec);
  };

  render() {
    const { label } = this.state;

    return (
      <section>
        <header className="header">
          <h1>todos</h1>
          <form className="new-todo-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              className="new-todo"
              required
              placeholder="Task"
              onChange={this.onChange}
              value={label}
              name="label"
            />
            <input
              type="number"
              className="new-todo-form__timer"
              required
              placeholder="Min"
              onChange={this.onChange}
              name="min"
            />
            <input
              type="number"
              className="new-todo-form__timer"
              required
              placeholder="Sec"
              onChange={this.onChange}
              name="sec"
            />
            <input type="submit" className="hideSubmit" />
          </form>
        </header>
      </section>
    );
  }
}
