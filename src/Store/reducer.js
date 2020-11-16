import { combineReducers } from 'redux'

import TodosReducer from './todosReducer'
import FilterReducer from './filtersReducer'

const Reducer = combineReducers({
  todos: TodosReducer,
  filters: FilterReducer
})

export default Reducer