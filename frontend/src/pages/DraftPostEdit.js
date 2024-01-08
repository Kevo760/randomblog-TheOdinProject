import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const DraftPostEditPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    overflow: auto;
    height: 100%;
    max-height: fit-content;
    padding-bottom: 100px;
    .spinner-border {
      margin-top: 100px;
    }
    .postdetail-box {
      margin-top: 40px;
      width: 100%;
      max-width: 800px;
      height: 100%;
      max-height: fit-content;
      padding: 16px;
      border-radius: 4px;
      color: white;
      background-color: rgb(33, 37, 41);
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    }
    .postdetail-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .post-created {
      font-size: 12px;
      color: rgb(173, 181, 189);
      font-weight: bold;
    }
    .postdetail-body {
      margin-top: 20px;
    }
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


export const DraftPostEdit = () => {
  const { draftID } = useParams();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!user) {
        setError('You must be logged in')
    } else if(user.userData.status !== 'Admin') {
        setError('You must be authorized')
    }

    const updatePost = {title, body}

    const response = await fetch(`/draftpost/${draftID}`, {
        method: 'PATCH',
        body: JSON.stringify(updatePost),
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
        navigate('/draftpostcontrol');
    }
}



  useEffect(() => {
    setIsLoading(true);

    // If there is no user or if user is not an admin navigate to login
    if(!user) {
      navigate('/login');
    } else if(user.userData.status !== 'Admin') {
      navigate('/');
    }

    const fetchPost = async() => {
      const res = await fetch(`/draftpost/${draftID}`);
      const json = await res.json();

      if(!res.ok) {
        navigate('pagenotfound')
      }

      if(res.ok) {
        setBody(json.body)
        setTitle(json.title)
        setIsLoading(false)
      } 
    }

    fetchPost()
  }, [ navigate, draftID, user])

  return (
    <DraftPostEditPage>
      {
        isLoading ?
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        :
        <FormPost className='create' onSubmit={handleSubmit}>
        <h3>Update draft post</h3>
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
    
        <button>Update</button>
        {
            error && <div className='error-text'>{error}</div>
        }
    </FormPost>

      } 
    </DraftPostEditPage>
  )
}