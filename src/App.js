import { Component } from 'react';
import './App.css';
import AddTodo from './Components/addTodo';
import TodoFilters from './Components/todoFilters';
import TodoList from './Components/todoList';
import { todosStore } from './Store/todosStore'

function App() {

  const {filter, addTodo, updateFilter} = todosStore

  return (
    <div className="todo-list-app">
      <AddTodo addTodo = {addTodo}/>
      <TodoList store={todosStore}/>
      <TodoFilters updateFilter = {updateFilter} filter={filter}/>
    </div>
  )
};

export default App;
