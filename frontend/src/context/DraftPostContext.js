import { createContext, useReducer } from "react";


export const DraftPostContext = createContext();

export const draftPostReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DRAFT':
            return {
                drafts: action.payload
            }
        case 'CREATE_DRAFT':
            return {
                drafts: [action.payload, ...state.drafts]
            }
        case 'DELETE_DRAFT':
            return {
                drafts: state.drafts.filter((draft) => draft._id !== action.payload._id)
            }
        default:
            return state
    }
}


export const DraftPostContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(draftPostReducer, {
        drafts: null
    });


    return (
        <DraftPostContext.Provider value={{...state, dispatch}}>
            {
                children
            }
        </DraftPostContext.Provider>
    )
};