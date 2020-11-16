import { useDispatch } from 'react-redux'
import { TODOTOGGLED, TODOREMOVED, TODOEDIT } from '../Store/actions';
import TodoEditModal from './Modal/todoEditModal';

const Todo = (props) => {
    const completedStyle = {
        color: "grey",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }

    const { id, text, completed } = props.todo

    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch( { type: TODOTOGGLED, payload: props.todo })
    }

    const handleRemove = () => {
        dispatch( {type: TODOREMOVED, payload: id })
    }

    const changeText = (text) => {
        const newText = text

        dispatch (
           {type: TODOEDIT, payload: {id, text: newText}}
        )
    }
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={completed}
                onChange={handleToggle}
            />
            <p className="todo-item-text" style={completed ? completedStyle : null}>
                {text}
            </p>
            <div className="todo-item-buttons" >
                <TodoEditModal text={text} changeText={changeText} />
                <button
                    className="button remove-button"
                    onClick={handleRemove}>
                    Remove
                </button>
            </div>
        </li>
    )
}

export default Todo;