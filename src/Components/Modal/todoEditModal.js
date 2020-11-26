import React, { useState } from 'react';

const TodoEditModal = (props) => {
    const [visible, setVisibility] = useState(false);
    const [todoName, setTodoName] = useState(props.todo.text);
    const [error, setErrorVisibility] = useState(false)

    const handleClose = () => setVisibility(false);
    const handleShow = () => {
        setVisibility(true);
        setErrorVisibility(false);
        setTodoName(props.todo.text);
    }

    const editName = () => {
        if (todoName === "") {
            setErrorVisibility(true)
            return;
        }

        props.editTodo(props.todo.id, todoName)
        
        handleClose();
        setErrorVisibility(false);
    }

    return (
        <div>
            <button className="button edit-button" onClick={handleShow}>
                Edit
            </button>
            { visible &&
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Edit Todo Name</h2>
                    </div>
                    <div className="modal-body todo-header">
                        <input
                            type="text"
                            value={todoName}
                            name="todoName"
                            placeholder="Type a new name."
                            onChange={(event) => setTodoName(event.target.value)}
                        />
                        <button 
                            className="button input-button"
                            onClick={() => editName()}>
                            Edit Name
                        </button>
                        {error && (
                            <p className="error">Трябва да добавите име.</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        
                        <button
                            className="button close"
                            onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
            }
        </div>

    )
}

export default TodoEditModal