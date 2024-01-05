import { useAuthContext } from "./useAuthContext";
import { useDetailPostContext } from "./useDetailPostContext";
import { useState } from "react";
import { useLogout } from "./useLogout";
import { useNavigate } from "react-router-dom";



export const useDeleteComment = (commentid) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useDetailPostContext();
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const deleteComment = async(commentid) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/comment/${commentid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            // If token is expired log out user
            if(json.error === 'jwt expired') {
                logout()
                navigate('/')
            }
            setError(json.error)
        }

        if(response.ok) {
            setIsLoading(false)
            dispatch({type: 'DELETE_COMMENT', payload: json})
        }
    }

    return {deleteComment, isLoading, error}
}
