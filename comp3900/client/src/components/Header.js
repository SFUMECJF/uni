import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
// Components
import Logo from './Logo';
import { SearchBar } from './Header/SearchBar';
import { MdHome } from 'react-icons/md';
// Redux
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/userSlice';
import ProfileIcon from './Header/ProfileIcon';

const HeaderContainer = styled.div`
    height: 50px;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;
    box-sizing: border-box;
    ${props => props.display && 'display: none;'}
`

const IconBtnGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 120px;
    justify-content: space-evenly;
`

const HomeButton = styled(MdHome)`
    color: #A90000;
    width: 40px;
    height: 40px;
    cursor: pointer;

    &:hover {
        color: red;
    }
`

/**
 * Header component which shows at the top of the main page
 * @param {*} token - User authentication token
 */
const Header = ({ token }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation().pathname;

    // Removes all localStorage items
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('profilePicture')
        window.localStorage.removeItem('id')
        dispatch(logout())
        history.push('/login')
    }

    // Redirects to profile page
    const handleProfile = () => {
        const username = window.localStorage.getItem('username')
        history.push('/profile/' + username);
    }

    // Redirects to main page
    const handleHome = () => {
        history.push('/main')
    }

    return (
        <HeaderContainer
            display={ location === '/' }
        >
            <Logo
                style={{
                    width: '40px',
                    height: '40px'
                }}
                titleStyle={{
                    fontSize: '2em',
                    marginRight: '0.5rem'
                }}
            />
            <SearchBar token={token}/>
            <IconBtnGroup>
                <HomeButton onClick={handleHome}/>
            </IconBtnGroup>
            <ProfileIcon token={token} logout={handleLogout} profile={handleProfile}/>
        </HeaderContainer>
    )
}

export default Header
