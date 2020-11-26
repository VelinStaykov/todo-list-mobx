import { createTodo } from './todosModel'
import { database } from '../Config/firebaseConfig'
import { makeAutoObservable } from 'mobx'
import { StatusFilters } from './todosModel'

export class TodosStore {
    todos = [];
    filter = {
        status: StatusFilters.All
    }

    constructor() {
        makeAutoObservable(this);
        this.setTodos = this.setTodos.bind(this);
    }

    setTodos() {

        database.collection('todos').onSnapshot((querySnapshot) => {
            let todos = []

            querySnapshot.forEach((document) => {
                
                const { text, completed } = document.data()

                const todo = {
                    id: document.id,
                    text: text,
                    completed: completed
                }
                todos.push(todo)
            })
            
            this.todos = todos;
        });
    }

    addTodo(text) {
        const todo = createTodo(text)
        
        database.collection('todos').doc(`${todo.id}`).set({
            text: todo.text,
            completed: todo.completed
        })
    }

    removeTodo(id){
        database.collection('todos').doc(id).delete();
    }

    toggleTodo(id, completed){
        database.collection('todos').doc(id).update({completed: !completed});
    }

    editTodo(id, text){
        database.collection('todos').doc(id).update({text: text});
    }

    updateFilter(status){
        this.filter.status = status;
    }

    get filteredTodos() {
        const status = this.filter.status
        const todos = this.todos

        switch (status) {
            case 'completed':
                return todos.filter(t => t.completed);
            case 'active':
                return todos.filter(t => !t.completed);
            default:
                return todos;
        }
    }

}

export const todosStore = new TodosStore();

