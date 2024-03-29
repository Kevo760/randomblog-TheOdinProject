import React, { useState } from 'react';
import { useDetailPostContext } from '../hooks/useDetailPostContext';
import styled from 'styled-components';
import { useAuthContext } from '../hooks/useAuthContext';

const CommentBarStyle = styled.form`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: fit-content;
  padding: 10px;
  background-color: rgb(33, 37, 41);
  .comment-control {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  input {
        width: 100%;
        padding: 14px;
        border-radius: 6px;
        background-color: rgb(73, 80, 87);
        color: white;
        border: none;
        outline: none;
  }
  ::placeholder {
        color: grey;
        opacity: 1; /* Firefox */
  }
  button {
        width: 80px;
        padding: 6px;
        border-radius: 6px;
        background-color: rgb(0, 168, 232);
        border: none;
        font-weight: bold;
        color: white;
    }
    button:hover {
        background-color: rgb(0, 52, 89);
    }
    button:active {
        background-color: rgb(0, 168, 232);
    }
`

export const AddCommentBar = () => {
    const { post, dispatch } = useDetailPostContext();
    const { user } = useAuthContext();
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async(e) => {
      e.preventDefault();

      if(!user) {
        setError('You must be logged in')
      }

      const postid = post._id
      const comment = {message, postid}

      const response = await fetch('/comment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(comment),
      })

      const json = await response.json()

      if(!response.ok) {
        setError(json.error)
      }

      if(response.ok) {
        dispatch({type: 'ADD_COMMENT', payload: json})
        setMessage('')
        setError(null)
      }

    }

  return (
    <CommentBarStyle onSubmit={handleSubmit}>
      <div className='comment-control'>
        <input 
          name='message'
          type='text'
          placeholder='Add Comment'
          value={message}
          required={true}
          minLength={3}
          onChange={e => setMessage(e.target.value)}
          maxLength={100}
          autoComplete='off'
        />
        <button>Send</button>
      </div>
      
      {
        error && <div className='error-text'>{error}</div>
      }
    </CommentBarStyle>
  )
}
