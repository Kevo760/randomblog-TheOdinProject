import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDetailpostContext } from '../hooks/useDetailPostContext';
import { useNavigate, useParams } from 'react-router-dom'



const PostDetailPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
    

export const PostDetail = () => {
  const { post, dispatch } = useDetailpostContext();
  const { postID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log(postID)

  useEffect(() => {
    setIsLoading(true);

    const fetchPost = async() => {
      const res = await fetch(`/post/${postID}`);
      const json = await res.json();

      if(!res.ok) {
        navigate('pagenotfound')
      }

      if(res.ok) {
        dispatch('SET_POST', json)
        console.log(json)
        setIsLoading(false)
      } 
      
    }

    fetchPost()
  }, [dispatch, navigate, postID])

  return (
    <PostDetailPage>
        PostDetail
    </PostDetailPage>
  )
}
