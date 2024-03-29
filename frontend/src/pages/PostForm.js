import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const FormPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;

`

const FormPost = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: fit-content;
    width: 100%;
    max-width: 700px;
    margin-top: 40px;
    padding: 20px;
    color: white;
    background-color: rgb(33, 37, 41);
    border-radius: 4px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    h3 {
        text-align: center;
    }
    .form-group {
        display: flex;
        flex-direction: column;
    }
    button {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: none;
        color: white;
        background-color: rgb(0, 168, 232);
        font-weight: bold;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    }
    button:hover {
        background-color: rgb(0, 52, 89);
    }
    button:active {
        background-color: rgb(0, 168, 232);
    }
    input {
        padding: 10px;
        background-color: rgb(73, 80, 87);
        color: white;
        border: none;
        outline: none;
        border-radius: 5px;
    }
    textarea {
        padding: 10px;
        background-color: rgb(73, 80, 87);
        color: white;
        border: none;
        outline: none;
        border-radius: 5px;
    }
`

export const PostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { logout } = useLogout();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Checks for user
        if(!user) {
            setError('You must be logged in')
        } else if(user.userData.status !== 'Admin') {
            setError('You must be authorized')
        }

        const post = {title, body}
        try {
            // If checked is true save post as a draft
        if(checked) {
            const response = await fetch('/draftpost', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

   
            const json = await response.json()
            if(!response.ok) {
                // if log out error is jwt expired, logout user
                if(json.error === 'jwt expired'){
                    logout()
                }
    
                setError(json.error)
            }
    
            if(response.ok) {
                setTitle('');
                setBody('');
                setError(null);
                navigate('/draftpostcontrol');
            }
        // Else if not checked upload it to post
        } else {
            const response = await fetch('/post', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(!response.ok) {
                // if log out error is jwt expired, logout user
                if(json.error === 'jwt expired'){
                    logout()
                }
    
                setError(json.error)
            }
    
            if(response.ok) {
                setTitle('');
                setBody('');
                setError(null);
                navigate('/');
            }
        }
        } catch(error) {
            setError(error.message)
        }

        
    }



    // If there is no user or if user is not an admin navigate to login
    useEffect(() => {
        if(!user) {
            navigate('/login');
        } else if(user.userData.status !== 'Admin') {
            navigate('/');
        }

    }, [user, navigate])

  return (
    <FormPage>
        <FormPost className='create' onSubmit={handleSubmit}>
            <h3>Add Post</h3>
            <div className='form-group'>
                <input 
                    type='text'
                    name='title'
                    placeholder='Add Title'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required={true}
                    minLength={3}
                    maxLength={100}
                />
            </div>

            <div className='form-group'>
                <textarea
                    type='text'
                    name='body'
                    placeholder='Add Body'
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    required={true}
                    minLength={3}
                />
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(event) => setChecked(event.target.checked)} />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Save as a draft</label>
            </div>
            <button>Add Post</button>
            {
                error && <div className='error-text'>{error}</div>
            }
        </FormPost>
    </FormPage>
  )
}
