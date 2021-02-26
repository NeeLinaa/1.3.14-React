import React, { useState, useEffect } from 'react';

import NewTaskForm from './new-task-form';
import TaskList from './task-list';
import Footer from './footer';

const App = () => {
  let maxId = 10;

  function createTaskItem(label, min, sec) {
    return {
      label,
      completed: false,
      id: maxId++, // eslint-disable-line no-plusplus
      created: new Date(),
      min: Number(min),
      sec: Number(sec),
      timer: false,
    };
  }

  const [taskData, setTaskData] = useState([
    createTaskItem('Completed task', '12', '23'),
    createTaskItem('Editing task', '12', '23'),
    createTaskItem('Active task', '12', '23'),
  ]);

  const [filter, setFilter] = useState('');

  const onFilterChange = (filterNAme) => {
    setFilter(filterNAme);
  };

  function filterOut(items, filterName) {
    switch (filterName) {
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

  const addItem = (text, min, sec) => {
    const newItem = createTaskItem(text, min, sec);
    const newArr = [...taskData, newItem];

    setTaskData(newArr);
  };

  const deleteCompletedItem = () => {
    const newArr = taskData.filter((item) => !item.completed);

    setTaskData(newArr);
  };

  const deleteItem = (id) => {
    const idx = taskData.findIndex((el) => el.id === id);

    const newArr = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)];

    setTaskData(newArr);
  };

  const toggleTimer = (id, bool) => {
    const idx = taskData.findIndex((el) => el.id === id);

    const oldItem = taskData[idx];

    const newItem = { ...oldItem, timer: bool };
    const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

    setTaskData(newArr);
  };

  const onToggleCompleted = (id) => {
    const idx = taskData.findIndex((el) => el.id === id);

    const oldItem = taskData[idx];
    const newItem = { ...oldItem, completed: !oldItem.completed };

    const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

    setTaskData(newArr);
  };

  const visibleItems = filterOut(taskData, filter);
  console.log(taskData);
  const completedCount = taskData.filter((el) => el.completed).length;
  const leftTodoCount = taskData.length - completedCount;

  useEffect(() => {
    /* eslint-disable */
    const countTime = setInterval(() => {
      const newTaskData = taskData.map((elem) => {
        if (elem.timer) {
          const allTime = elem.min * 60 + elem.sec;
          const leftTime = allTime - 1;
          if (elem.min <= 0 && elem.sec <= 0) return elem;
          elem.min = Math.floor(leftTime / 60);
          elem.sec = leftTime % 60;
          return elem;
        }
        return elem;
      });
      setTaskData(newTaskData);
    }, 1000);
    const clearCountTime = () => {
      clearInterval(countTime);
    };
    return clearCountTime;
    /* eslint-enable */
  }, [taskData]);

  return (
    <div className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          toggleTimer={toggleTimer}
        />
        <Footer
          leftToDo={leftTodoCount}
          filter={filter}
          onFilterChange={onFilterChange}
          deleteCompletedItem={deleteCompletedItem}
        />
      </section>
    </div>
  );
};

export default App;
