import React, { useState } from 'react';
import styled from 'styled-components';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { ToDateTime_Med } from '../functions/convertTime';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useDraftPostContext } from '../hooks/useDraftPostContext';

const PostBox = styled.div`
    display: grid;
    grid-template-columns: 95% auto;
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: 100%;
    max-width: 700px;
    padding: 16px;
    border-radius: 4px;
    color: black;
    background-color: white;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    .post-items {
      display: flex;
      flex-direction: column;
    }
    .control-icons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .post-top {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    .post-created {
      font-size: 12px;
      color: rgb(173, 181, 189);
      font-weight: bold;
    }
    i {
      cursor: pointer;
    }
`


function MiniDraftPostBox({ draftpost }) {
  const { dispatch } = useDraftPostContext()
  const { user } = useAuthContext();
  const [error, setError] = useState('');
  const { logout } = useLogout();
  const navigate = useNavigate();

  // Navigate to post via postid
  const handlePostLink = (draftpost) => {
    navigate(`/editdraftpost/${draftpost._id}`)
  }


  // Admin and user logged in protection
  const handleClick = async() => {
    if(!user || user.userData.status !== 'Admin') {
      navigate('/')
    }

    const response = await fetch('/draftpost/' + draftpost._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
    }
    });

    const json = await response.json();

    if(!response.ok) {
      // if log out error is jwt expired, logout user
      if(json.error === 'jwt expired'){
        logout()
    }
      setError(json.error)
    };

    if(response.ok) {
      dispatch({ type: 'DELETE_DRAFT', payload: json})
    };

  }

  return (
    <PostBox>
      <div className='post-items'>
        <div className='post-top'>
          <h2>{draftpost.title}</h2>
          <span className='post-created'>Last Edit: {ToDateTime_Med(draftpost.updatedAt)}</span>
        </div>
        
        <p>{draftpost.body}</p>

        {
          error && <div className='error-text'>{error}</div>
          }
      </div>
      <div className='control-icons'>
        <i className="bi bi-pencil-square"  data-toggle="tooltip" data-placement="top" title="Edit post" onClick={e => handlePostLink(draftpost._id)}></i>
        <i className="bi bi-trash-fill" data-toggle="tooltip" data-placement="top" title="Delete post" onClick={e => handleClick()}></i> 
      </div>
    </PostBox>
  )
}

export default MiniDraftPostBox