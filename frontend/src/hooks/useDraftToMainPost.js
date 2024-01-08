import  { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLogout } from './useLogout';

export const useDraftToMainPost = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();

    // Sends draft post to main post
    const draftToMainPost = async(draftpost) => {
        setIsLoading(true)
        setError(null)

        const title = draftpost.title
        const body = draftpost.body
        const draftid = draftpost._id

        const post = {title, body, draftid}
        
        const response = await fetch(`post/convertdraft/`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
    
        const json = await response.json()
    
        if(!response.ok) {
            if(json.error === 'jwt expired') {
                logout()
                navigate('/')
            }
            setIsLoading(false)
            setError(json.error)
        }
    
        if(response.ok) {
            setIsLoading(false)
            navigate('/')
        }
      }
    
      return { draftToMainPost, isLoading, error }
}