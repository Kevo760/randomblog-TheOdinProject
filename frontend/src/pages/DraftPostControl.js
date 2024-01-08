import { useEffect } from "react";
import styled from 'styled-components';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useDraftPostContext } from "../hooks/useDraftPostContext";
import MiniDraftPostBox from "../components/MiniDraftPostBox";

const DraftPostControlPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .post-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 10px;
        margin-top: 10px;
        width: 100%;
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

const DraftPostControl = () => {
    const { drafts, dispatch } = useDraftPostContext();
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
            const res = await fetch('/draftpost');
            const json = await res.json();

            if(res.ok) {
                dispatch({ type: 'SET_DRAFT', payload: json })
            }
        }

        fetchPost();
    }, [dispatch, user, navigate])

    return (
        <DraftPostControlPage>
           <div className='post-section'>
                {
                    drafts && 
                    drafts.map((draftpost) => (
                        <MiniDraftPostBox draftpost={draftpost} key={draftpost._id}/>
                    ))
                }
                {
                    drafts && drafts.length === 0 && 
                    <div className="message-box">
                        <h2>There are not draft post</h2>
                    </div> 
                }   
           </div>
        </DraftPostControlPage>
    )
}

export default DraftPostControl