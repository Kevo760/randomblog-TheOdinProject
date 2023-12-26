import React, { useState } from 'react';
import styled from 'styled-components';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export const LoginPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100%;
    height: 100%;
    padding: 10px;
    form {
        margin-top: 80px;
        width: 100%;
        max-width: 500px;
        height: fit-content;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: center;
        background-color: rgb(33, 37, 41);
        border-radius: 8px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        }
    input {
        width: 100%;
        padding: 6px;
        border-radius: 6px;
        background-color: rgb(73, 80, 87);
        color: white;
        border: none;
        outline: none;
    }
    ::placeholder {
        color: grey;
        opacity: 1; /* Firefox */
    }
    button {
        margin-top: 10px;
        width: 100%;
        padding: 6px;
        border-radius: 6px;
        background-color: rgb(0, 168, 232);
        border: none;
        font-weight: bold;
        color: white;
    }
    button:hover {
        background-color: rgb(0, 52, 89);
    }
    button:active {
        background-color: rgb(0, 168, 232);
    }
`

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        await login(username, password)
        navigate('/')
    };

  return (
    <LoginPage>
        <form className='login-form' onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)} 
                placeholder='Username'
                required={true}
            />

            <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                required={true}
            />

            <button>Log in</button>
            {
                error && <div className='error-text'>{error}</div>
            }
        </form>
    </LoginPage>
  )
}