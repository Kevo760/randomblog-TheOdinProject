import { createContext, useReducer } from "react";


export const DetailPostContext = createContext();

export const detailPostReducer = (state, action) => {
    switch(action.type) {
        case 'SET_POST':
            return {
                post: action.payload
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                post: {
                    ...state.post, comments: [action.payload, ...state.post.comments]
                }
            }
        case 'DELETE_COMMENT':
            return {
                ...state,
                post: {
                    ...state.post, comments: state.post.comments.filter((comment) => comment._id !== action.payload._id)
                }
            }
        default:
            return state
    }
}


export const DetailPostProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(detailPostReducer, {
        post: null
    });


    return (
        <DetailPostContext.Provider value={{...state, dispatch}}>
            {
                children
            }
        </DetailPostContext.Provider>
    )
};