import React from 'react';
import styled from 'styled-components';

const PostBox = styled.div`
    height: fit-content;
    width: 100%;
    max-width: 700px;
    padding: 10px;
    background-color: white;
    border-radius: 4px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`


function MiniPostBox({ post }) {
  return (
    <PostBox>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </PostBox>
  )
}

export default MiniPostBox