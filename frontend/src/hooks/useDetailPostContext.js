import { useContext } from "react"
import { DetailPostContext } from "../context/DetailPostContext";


export const useDetailpostContext = () => {
  const context = useContext(DetailPostContext);

  if(!context) {
    throw Error('useDetailPostContext must be used inside an DetailPostContextProvider')
  };

  return context
}

