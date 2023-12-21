import React from 'react';
import styled from 'styled-components';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';

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
    color: white;
    background-color: rgb(33, 37, 41);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    .post-items {
      display: flex;
      flex-direction: column;
    }
    .delete-post-btn {
      display: flex;
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


function MiniPostBox({ post }) {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const handleClick = async() => {
    if(!user) {
      return
    }

    const response = await fetch('/post/' + post._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
    }
    });

    const json = await response.json();

    if(response.ok) {
      dispatch({ type: 'DELETE_POST', payload: json})
    }

  }

  const postdate = new Date(post.createdAt)
  
  
  return (
    <PostBox>
      <div className='post-items'>
        <div className='post-top'>
          <h2>{post.title}</h2>
          <span className='post-created'>{postdate.toDateString()}</span>
        </div>
        
        <p>{post.body}</p>
      </div>
      {/* <div className='delete-post-btn'>
        <i className="bi bi-trash-fill" onClick={e => handleClick()}></i>
      </div> */}
    </PostBox>
  )
}

export default MiniPostBox