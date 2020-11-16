import { createSelector } from 'reselect'
import { StatusFilters } from './filtersReducer'

const initialState = {
  todos: []
}

const TodosReducer = (state = initialState, action) => {

  const gotTodos = (state, action) => {

    const newTodos = action.payload
    
     return {
      ...state,
      todos: newTodos
    } 
  }

  switch (action.type) {
    case "GOTTODOS":
      return gotTodos(state, action);
    default:
      return state; 
  }
}

export default TodosReducer

export const selectTodos = (state) => state.todos.todos

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {

    const { status } = filters
    const showAllCompletions = status === StatusFilters.All
    
    if (showAllCompletions) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      return statusMatches 
    })
  }
)