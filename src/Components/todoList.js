import React, { useEffect } from "react";
import Todo from "./todo";
import { observer } from "mobx-react";

const TodoList = observer(({store}) => {

  useEffect(() => {
    store.setTodos()
  }, [store])
  
  const filteredTodos = store.filteredTodos;

  const renderedListItems = filteredTodos.map(todo => 
      <Todo key={todo.id} todo={todo} removeTodo={store.removeTodo} toggleTodo={store.toggleTodo} editTodo={store.editTodo} />
  )

  return <ul className="todo-list">{renderedListItems}</ul>;
});
export default TodoList;
