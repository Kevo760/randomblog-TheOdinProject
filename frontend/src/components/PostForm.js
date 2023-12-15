import React, { useState } from 'react';
import styled from 'styled-components';
import { usePostsContext } from '../hooks/usePostsContext';

const FormPost = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: fit-content;
    width: 100%;
    max-width: 700px;
    padding: 20px;
    background-color: white;
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
    }
    textarea {
        padding: 10px;
    }
    .error-msg {
        color: tomato;
        font-weight: bold;
    }
    ul {
        margin: auto;
        width: fit-content;
        text-align: center;
    }
`

export const PostForm = () => {
    const {dispatch} = usePostsContext();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [err, setErr] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const post = {title, body}

        const response = await fetch('/post', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok) {
            setErr(json.error)
            console.log(json.error)
        }

        if(response.ok) {
            dispatch({type: 'CREATE_POST', payload: json})
            setTitle('');
            setBody('');
            setErr(null);
            console.log('New post addded', json);
        }
    }

  return (
    <FormPost className='create' onSubmit={handleSubmit}>
        <h3>Add Post</h3>
        <div className='form-group'>
            <input 
                type='text'
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
                placeholder='Add Body'
                onChange={(e) => setBody(e.target.value)}
                value={body}
                required={true}
                minLength={3}
            />
        </div>
    
        <button>Add Post</button>
        {
            err && 
            <ul>
                {
                    err.map(e => <div key={e.path} className='error-msg'>{e.msg}</div>)
                }
            </ul>
        }
    </FormPost>
  )
}
