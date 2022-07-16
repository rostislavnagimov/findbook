import { ERROR, SEARCH, NOERROR } from "./types";
import { LOAD, LOADMORE } from "./types";


const initialState = {
    query: {
        text: '',
        category: '',
        sorting: ''
    },
    response: undefined,
    totalItems: undefined,
    error: null

}

export const Reducer = (state = initialState, action) => {

    switch (action.type){

        case SEARCH:
            return {
                ...state,
                query: action.data
            }
        case LOAD:
            return {
                ...state,
                response: action.data.items,
                totalItems: action.data.totalItems,
            }

        case LOADMORE:
            return {
                ...state,
                response: state.response.concat(action.data.items),
            }

        case ERROR:
            return {
                ...state,
                error: 'CONNECTION ERROR'
            }

        case NOERROR:
            return {
                ...state,
                error: null
            }
            
            
        
        default:
            return state;
        }

}