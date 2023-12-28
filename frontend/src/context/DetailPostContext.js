import { createContext, useReducer } from "react";


export const DetailPostContext = createContext();

export const detailPostReducer = (state, action) => {
    switch(action.type) {
        case 'SET_POST':
            return {
                post: action.payload
            }
        case 'CREATE_COMMENT':
            return {
                post: {
                    comments: [action.payload, ...state.posts]
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