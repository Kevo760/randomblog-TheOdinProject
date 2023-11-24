import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SiteBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: rgb(33, 37, 41);
  overflow: hidden;
  &.site-links-bar {
    height: 30px;
    background-color: rgb(0, 168, 232);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }
  .site-links {
    width: 60px;
    height: 30px;
  }
  .site-links:hover {
    background-color: rgb(0, 52, 89);
  }
  i {
    color: white;
    scale: 1.5;
  }
`

export const Navbar = () => {
  return (
      <header>
        <SiteBar>
          <p>Random-Blog</p>
          <i className="bi bi-patch-question"></i>
        </SiteBar>
        <SiteBar className='site-links-bar'>
          <Link className='site-links' to='/'>Home</Link>
        </SiteBar>
    </header>
  )
}

