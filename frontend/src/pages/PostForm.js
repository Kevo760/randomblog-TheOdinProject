import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

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
    const { dispatch } = usePostsContext();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!user) {
            setError('You must be logged in')
        } else if(user.userData.status !== 'Admin') {
            setError('You must be authorized')
        }

        const post = {title, body}

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
            setError(json.error)
        }

        if(response.ok) {
            dispatch({type: 'CREATE_POST', payload: json})
            setTitle('');
            setBody('');
            setError(null);
            navigate('/');
        }
    }

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
        
            <button>Add Post</button>
            {
                error && <div className='error-text'>{error}</div>
            }
        </FormPost>
    </FormPage>
  )
}
