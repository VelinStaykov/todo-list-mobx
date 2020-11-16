import { Component } from 'react';
import './App.css';
import AddTodo from './Components/addTodo';
import TodoFilters from './Components/todoFilters';
import TodoList from './Components/todoList';

class App extends Component {

  render() {
    return (
      <div className="todo-list-app">
        <AddTodo />
        <TodoList />
        <TodoFilters />
      </div>
    )
  }
};

export default App;
