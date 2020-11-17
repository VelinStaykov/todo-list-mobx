import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GETTODOS } from '../Store/actions';
import { selectFilteredTodos } from '../Store/todosReducer'
import Todo from './todo'

const TodoList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( { type: GETTODOS})
  }, [])
  
  const filteredTodos = useSelector(selectFilteredTodos)

  const renderedListItems = filteredTodos.map(todo => 
      <Todo key={todo.id} todo={todo} />
  )

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
