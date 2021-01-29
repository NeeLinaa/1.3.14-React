import React, { Component } from 'react';

import NewTaskForm from './new-task-form'
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
    date: new Date()
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

  createTaskItem(label, min, sec) {
    return {
      label,  
      completed: false,
      id: this.maxId++,
      created: new Date(),
      min,
      sec,
      timer: false
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

  addItem = (text, min, sec) => {

    const newItem = this.createTaskItem(text, min, sec)

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem]

      return {
        taskData: newArr,
      }
    })
  }

  toggleTimer = (id, bool) => {
    
    this.setState(({ taskData }) => {

      const idx = taskData.findIndex((el) => el.id === id)

      const oldItem = taskData[idx]
      
        const newItem = { ...oldItem, timer: bool}
        const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

        return {
          taskData: newArr,
        }
    })
  }

startTimer() {
  this.state.taskData.forEach(elem => {
    if (elem.timer === true) {
      let allTime = elem.min * 60 + elem.sec;
      let leftTime = allTime - 1;
      return (
        elem.min = Math.floor(leftTime / 60 ),
        elem.sec = leftTime % 60
      )
    } 
  })
}

  componentDidMount = () => {
    this.countTime = setInterval(() => {
      this.startTimer()
    }, 1000)
    
  }

  componentWillUnmount() {
    clearInterval(this.countTime)
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
    // console.log(taskData)
    const visibleItems = this.filter(taskData, filter)

    const completedCount = taskData.filter((el) => el.completed).length;
    const leftTodoCount = taskData.length - completedCount;

    return (
      <div className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            props={visibleItems}
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
    )
  }

}