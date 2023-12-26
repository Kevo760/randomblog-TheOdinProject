import React from 'react';
import styled from 'styled-components';


const NotFoundPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    .notfoundbox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 200px;
        width: 100%;
        max-width: 600px;
        gap: 10px;
        padding: 20px;
        margin-top: 60px;
        background-color: white;
        border-radius: 6px;
    }
`

export const PageNotFound = () => {
  return (
    <NotFoundPage>
        <div className='notfoundbox'>
            <h1>Page Not Found</h1>
        </div>
    </NotFoundPage>
  )
}
