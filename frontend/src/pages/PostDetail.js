import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDetailPostContext } from '../hooks/useDetailPostContext';
import { useNavigate, useParams } from 'react-router-dom'
import { AddCommentBar } from '../components/AddCommentBar';
import { useAuthContext } from '../hooks/useAuthContext';
import { To24HourTime, ToDateTime_Med } from '../functions/convertTime';
import { useDeleteComment } from '../hooks/useDeleteComment';




const PostDetailPage = styled.div`
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

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  max-height: fit-content;
  width: 100%;
  padding: 10px;
  .comment-top-section {
    display: grid;
    grid-template-columns: 15% 80% auto;
    align-items: center;
    height: fit-content;
  }
  .comment-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .createdat-text {
    font-size: 10px;
    color: rgb(173, 181, 189);
    font-weight: bold;
  }
  .delete-post-btn {
    text-align: center;
    cursor: pointer;
  }
  
`

export const PostDetail = () => {
  const { post, dispatch } = useDetailPostContext();
  const { postID } = useParams();
  const { user } = useAuthContext();
  const { deleteComment } = useDeleteComment();
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    setIsLoading(true);

    // If there is no user or if user is not an admin navigate to login
    if(!user) {
      navigate('/login');
    } else if(user.userData.status !== 'Admin') {
      navigate('/');
    }

    const fetchPost = async() => {
      const res = await fetch(`/post/${postID}`);
      const json = await res.json();

      if(!res.ok) {
        navigate('pagenotfound')
      }

      if(res.ok) {
        dispatch({ type: 'SET_POST', payload: json})
        setIsLoading(false)
      } 
    }

    fetchPost()
  }, [dispatch, navigate, postID, user])

  return (
    <PostDetailPage>
      {
        isLoading ?
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        :
        <div className='postdetail-box'>
          <div className='postdetail-content'>
            <h2>{post.title}</h2>
            <span className='post-created'>{ToDateTime_Med(post.createdAt)}</span>
            <p className='postdetail-body'>{post.body}</p>
          </div>
          <hr></hr>
          <div className='postdetail-comments'>
            {
              post.comments.length > 0 ?
              post.comments.map(comment => {
                return(
                <CommentBox key={comment._id} className='comment-box'>
                  <div className='comment-top-section'>
                    <div className='comment-left'>
                      <b>{comment.username}</b>
                    </div>
                    <div className='comment-right'>
                      <p className='createdat-text'>{To24HourTime(comment.createdAt)}</p>
                      <p>{comment.message}</p>
                    </div>

                    {
                      user.userData.userid === comment.commenterid &&
                      <div className='delete-post-btn'>
                        <i className="bi bi-trash-fill" data-toggle="tooltip" data-placement="top" title="Delete comment" onClick={e => deleteComment(comment._id)}></i>
                      </div>
                    }
                    
                  </div>
                </CommentBox>
                )
              })
              :
              <p>There are no comments</p>
            }
          </div>

          { user && <AddCommentBar></AddCommentBar> }
        </div>

      } 
    </PostDetailPage>
  )
}
