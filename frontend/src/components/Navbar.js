import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const SiteBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: rgb(33, 37, 41);
  overflow: hidden;
  i {
    color: white;
    scale: 1.5;
  }
`

const LinksBar = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(0, 168, 232);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  .site-links {
    width: fit-content;
    height: 30px;
    text-align: center;
    color: white;
    padding: 0px 8px;
    cursor: pointer;
  }
  .site-links:hover {
    background-color: rgb(0, 52, 89);
  }
  .main-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .user-nav {
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
  .username-text {
    font-weight: bold;
    width: fit-content;
    height: 30px;
    text-align: center;
    padding: 0px 4px;
  }
`

export const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  return (
      <header>
        <SiteBar>
          <p>Random-Blog</p>
          <i className="bi bi-patch-question"></i>
        </SiteBar>

        <LinksBar>
          <div className='main-links'>
            <Link className='site-links' to='/'>Home</Link>
            {/* If user is admin add create post link */}
            {
              user && user.userData.status === 'Admin' ?
              <>
              <Link className='site-links' to='/addpost'>Add post</Link>
              <Link className='site-links' to='/editpost'>Edit posts</Link>
              </>
              
              :
              null
            }
          </div>
          {/* If user is logged in add username and log out button if not show sign up and login link */}
          {
            user ?
            <div className='user-nav'>
              <span className='username-text'>{user.userData.username}</span>
              <p className='site-links' onClick={e => handleLogout()}>Logout</p>
            </div>
            :
            <div className='user-nav'>
              <Link className='site-links' to='/login'>Login In</Link>
              <Link className='site-links' to='/signup'>Sign up</Link>
            </div>
          }
          
        </LinksBar>
    </header>
  )
}

