import React, { Component } from 'react';

import NewTaskForm from './new-task-form';
import TaskList from './task-list';
import Footer from './footer';

export default class App extends Component {
  maxId = 100;

  state = {
    taskData: [
      this.createTaskItem('Completed task', '12', '23'),
      this.createTaskItem('Editing task', '12', '23'),
      this.createTaskItem('Active task', '12', '23'),
    ],
    filter: 'all',
  };

  componentDidMount = () => {
    /* eslint-disable */
    this.countTime = setInterval(() => {
      this.state.taskData.forEach((elem) => {
        if (elem.timer) {
          const allTime = elem.min * 60 + elem.sec;
          const leftTime = allTime - 1;
          if (elem.min <= 0 && elem.sec <= 0) return elem;
          elem.min = Math.floor(leftTime / 60);
          elem.sec = leftTime % 60;
          this.setState({
            min: elem.min,
            sec: elem.sec,
          });
        }
        return elem;
      });
    }, 1000);
    /* eslint-enable */
  };

  componentWillUnmount() {
    clearInterval(this.countTime);
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTaskItem(text, min, sec);

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem];

      return {
        taskData: newArr,
      };
    });
  };

  deleteCompletedItem = () => {
    this.setState(({ taskData }) => {
      const newArr = taskData.filter((item) => !item.completed);
      return {
        taskData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);

      const newArr = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);

      const newArr = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  toggleTimer = (id, bool) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);

      const oldItem = taskData[idx];

      const newItem = { ...oldItem, timer: bool };
      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);

      const oldItem = taskData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  createTaskItem(label, min, sec) {
    return {
      label,
      completed: false,
      id: this.maxId++, // eslint-disable-line no-plusplus
      created: new Date(),
      min: Number(min),
      sec: Number(sec),
      timer: false,
    };
  }

  filterOut(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  render() {
    const { taskData, filter } = this.state;
    const visibleItems = this.filterOut(taskData, filter);

    const completedCount = taskData.filter((el) => el.completed).length;
    const leftTodoCount = taskData.length - completedCount;

    return (
      <div className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            toggleTimer={this.toggleTimer}
          />
          <Footer
            leftToDo={leftTodoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            deleteCompletedItem={this.deleteCompletedItem}
          />
        </section>
      </div>
    );
  }
}
