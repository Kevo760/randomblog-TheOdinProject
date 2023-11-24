import { useEffect, useState } from "react";
import styled from 'styled-components';
import MiniPostBox from "../components/MiniPostBox";
import { Link } from "react-router-dom";


const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .post-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
        padding: 10px;
        width: fit-content;
        height: fit-content;
    }
`

const Home = () => {
    const [posts, setPosts] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch('/post');
            const json = await res.json()

            if(res.ok) {
                setPosts(json)
            }
        }

        fetchPost()
    }, [])

    return (
        <HomePage>
           <div className='post-section'>
                {
                    posts && posts.map((post) => (
                        <Link to='/' key={post._id}>
                            <MiniPostBox post={post}/>
                        </Link>
                    ))
                }             
           </div>
        </HomePage>
    )
}

export default Home