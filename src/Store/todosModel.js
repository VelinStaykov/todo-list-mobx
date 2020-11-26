import { v4 as uuid } from 'uuid'

export function createTodo(todoText) {
    return {
        id: uuid(),
        text: todoText,
        completed: false
    };
}

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}