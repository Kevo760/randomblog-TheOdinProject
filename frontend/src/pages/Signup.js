import React, { useState } from 'react';
import { LoginPage as SignupPage } from './Login'
import { useSignup } from '../hooks/useSignup';

export const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();

        await signup(username, password)
    };

  return (
    <SignupPage>
        <form className='signup-form' onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)} 
                placeholder='Create username'
                required={true}
            />

            <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Create password'
                required={true}
            />

            <button disabled={isLoading}>Sign up</button>
            {
                error && <div className='error-text'>{error}</div>
            }
        </form>
    </SignupPage>
  )
}
