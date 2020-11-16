export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}
  
const initialState = {
    status: StatusFilters.All
}

const FiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERCHANGE': {
            return {
                ...state,
                status: action.payload
            }
        }
        default:
            return state
    }
}

export default FiltersReducer