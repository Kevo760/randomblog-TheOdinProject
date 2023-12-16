import { useEffect } from "react";
import styled from 'styled-components';
import MiniPostBox from "../components/MiniPostBox";
import { Link } from "react-router-dom";
import { PostForm } from "../components/PostForm";
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
`

const Home = () => {
    const { posts, dispatch } = usePostsContext()


    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch('/post');
            const json = await res.json()

            if(res.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
            }
        }

        fetchPost()
    }, [dispatch])

    return (
        <HomePage>
           <div className='post-section'>
                {
                    posts && posts.map((post) => (
                        <MiniPostBox post={post} key={post._id}/>
                    ))
                }
                <PostForm />             
           </div>
        </HomePage>
    )
}

export default Home