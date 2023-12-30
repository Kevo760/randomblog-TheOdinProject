import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
    h2 {
      cursor: pointer;
    }
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
  const navigate = useNavigate();

  const postdate = new Date(post.createdAt);


  const handlePostLink = (postid) => {
    navigate(`/post/${postid}`)
  }

  
  return (
    <PostBox>
      <div className='post-items'>
        <div className='post-top'>
          <h2 onClick={e => handlePostLink(post._id)}>{post.title}</h2>
          <span className='post-created'>{postdate.toDateString()}</span>
        </div>
        
        <p>{post.body}</p>
      </div>
    </PostBox>
  )
}

export default MiniPostBox