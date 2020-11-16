import { StatusFilters } from '../Store/filtersReducer'
import { FILTERCHANGE } from '../Store/actions';
import { useDispatch, useSelector } from 'react-redux'

const TodoFilters = (props) => {

    const dispatch = useDispatch();

    const StatusFilter = ({ value: status, onChange }) => {
        const renderedFilters = Object.keys(StatusFilters).map((key) => {
            const value = StatusFilters[key]
            const handleClick = () => onChange(value)
            const className = value === status ? 'selected' : ''

            return (
                <li key={value}>
                    <button className={className} onClick={handleClick}>
                    {key}
                    </button>
                </li>
            )
        })

        return (
            <div className="filters statusFilters">
                <h5>Filter by Status</h5>
                <ul>{renderedFilters}</ul>
            </div>
        )
    }

    const { status } = useSelector((state) => state.filters)

    const onStatusChange = (status) => {
        dispatch({ type: FILTERCHANGE, payload: status }) 
    }

    return (
        <footer className="filters">
            <StatusFilter value={status} onChange={onStatusChange} />
        </footer>
    )
}

export default TodoFilters