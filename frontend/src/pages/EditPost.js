import { useEffect } from "react";
import styled from 'styled-components';
import { usePostsContext } from "../hooks/usePostsContext";
import AdminMiniPostBox from "../components/AdminMiniPostBox";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const EditPostPage = styled.div`
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

const EditPost = () => {
    const { posts, dispatch } = usePostsContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();


    useEffect(() => {
         // If there is no user or if user is not an admin navigate to login
        if(!user) {
            navigate('/login');
        } else if(user.userData.status !== 'Admin') {
            navigate('/');
        }


        const fetchPost = async () => {
            const res = await fetch('/post');
            const json = await res.json();

            if(res.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
            }
        }

        fetchPost();
    }, [dispatch, user, navigate])

    return (
        <EditPostPage>
           <div className='post-section'>
                {
                    posts && posts.map((post) => (
                        <AdminMiniPostBox post={post} key={post._id}/>
                    ))
                }       
           </div>
        </EditPostPage>
    )
}

export default EditPost