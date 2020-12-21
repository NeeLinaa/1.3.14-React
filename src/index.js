import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { formatDistance, subDays } from 'date-fns'

import './index.css'
import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list';
import Footer from './components/footer';

export default class App extends Component {

  maxId = 100;

  static propTypes = {
    maxId: (props, propName, componentName) => {
      const val = props[propName];
      if (typeof val === 'number' && !isNaN(val)) return null;
      return new TypeError('Error')
    }
  }

  state = {
    taskData: [
      this.createTaskItem('Completed task'),
      this.createTaskItem('Editing task'),
      this.createTaskItem('Active task'),
    ],
    filter: 'all',
  }


  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case "active":
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  createTaskItem(label) {
    return {
      label,
      completed: false,
      id: this.maxId++,
      createdTask: new Date(),
    }
  }

  deleteItem = (id) => {

    this.setState(({ taskData }) => {

      const idx = taskData.findIndex((el) => el.id === id)

      const newArr = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]

      return {
        taskData: newArr,
      }

    })
  }

  deleteCompletedItem = () => {
    this.setState(({ taskData }) => {
      const newArr = taskData.filter((item) => !item.completed)
      return {
        taskData: newArr
      }
    })

  }

  addItem = (text) => {

    const newItem = this.createTaskItem(text)

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem]

      return {
        taskData: newArr,
      }
    })
  }

  onToggleCompleted = (id) => {

    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)

      const oldItem = taskData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

      return {
        taskData: newArr,
      }

    })
  }

  render() {

    const { taskData, filter } = this.state

    const visibleItems = this.filter(taskData, filter)

    const completedCount = taskData.filter((el) => el.completed).length;
    const leftTodoCount = taskData.length - completedCount;

    return (
      <div>
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            props={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted} />
          <Footer leftToDo={leftTodoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            deleteCompletedItem={this.deleteCompletedItem} />
        </section>
      </div>
    )
  }

}

App.defaultProps = {
  maxId: 100,
}

ReactDOM.render(<App />, document.getElementById('root'))