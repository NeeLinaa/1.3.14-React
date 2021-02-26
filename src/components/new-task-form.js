import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLAbel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onChange = (event) => {
    const { target } = event;
    const { name } = target;
    switch (name) {
      case 'label':
        setLAbel(target.value);
        break;
      case 'min':
        setMin(target.value);
        break;
      case 'sec':
        setSec(target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onItemAdded(label, min, sec);
  };

  return (
    <section>
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={onSubmit}>
          <input
            type="text"
            className="new-todo"
            required
            placeholder="Task"
            onChange={onChange}
            value={label}
            name="label"
          />
          <input
            type="number"
            className="new-todo-form__timer"
            required
            placeholder="Min"
            onChange={onChange}
            name="min"
          />
          <input
            type="number"
            className="new-todo-form__timer"
            required
            placeholder="Sec"
            onChange={onChange}
            name="sec"
          />
          <input type="submit" className="hideSubmit" />
        </form>
      </header>
    </section>
  );
};

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};

export default NewTaskForm;
