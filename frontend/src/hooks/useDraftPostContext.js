import { useContext } from 'react'
import { DraftPostContext } from '../context/DraftPostContext';


export const useDraftPostContext = () => {
  const context  = useContext(DraftPostContext);

    if(!context) {
        throw Error('useDraftPostsContext must be used inside an DraftPostContextProvider')
    };
    
  return context
}
