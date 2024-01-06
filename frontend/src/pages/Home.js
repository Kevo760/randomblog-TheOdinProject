import { useEffect } from "react";
import styled from 'styled-components';
import MiniPostBox from "../components/MiniPostBox";
import { usePostsContext } from "../hooks/usePostsContext";

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .post-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        margin-top: 10px;
        width: fit-content;
        height: fit-content;
        margin-bottom: 10px;
    }
    .message-box {
        text-align: center;
        width: 100%;
        max-width: 500px;
        padding: 16px;
        border-radius: 4px;
        color: white;
        background-color: rgb(33, 37, 41);
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    }
`

const Home = () => {
    const { posts, dispatch } = usePostsContext()

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch('/post');
            const json = await res.json();

            if(res.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
            }
        }

        fetchPost();
    }, [dispatch])

    return (
        <HomePage>
           <div className='post-section'>
                {
                    posts && posts.map((post) => (
                        <MiniPostBox post={post} key={post._id}/>
                    ))
                }
                {
                    posts && posts.length === 0 && 
                    <div className="message-box">
                        <h2>There are not post</h2>
                    </div> 
                }    
           </div>
        </HomePage>
    )
}

export default Home