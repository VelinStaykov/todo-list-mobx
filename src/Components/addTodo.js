import React, { useState } from 'react';

function AddTodo(props) {

    const [todoName, setTodoName] = useState("");
    const [error, setErrorVisibility] = useState(false)
    
    const sendTodoName = () => {
        if (todoName === "") {
            setErrorVisibility(true)
            return;
        }
        
        props.addTodo(todoName);
        
        setTodoName('')
        setErrorVisibility(false)
    }

    return (
        <header className="todo-header">
            <input
                type="text"
                value={todoName}
                name="todoName"
                placeholder="Add a new todo"
                onChange={(event) => setTodoName(event.target.value)}
            />
            <button className="button input-button" onClick={() => sendTodoName()}>
                Add Todo
            </button>
            {error && (
                <p className="error">Трябва да добавите име.</p>
            )}
        </header>
    )
}

export default AddTodo;