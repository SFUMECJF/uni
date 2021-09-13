import { useState, useEffect, useRef } from 'react';
// Components
import styled from 'styled-components';
import default_pic from '../Profile/pic.png'
// Redux
import { useSelector } from 'react-redux';
import { profilePictureSelector } from '../../redux/features/userSlice';

// Styled components
const Icon = styled.img`
    border-radius: 50%;
    border: solid 2px #A90000;
    width: 45px;
    height: 45px;
    cursor: pointer;
`

const ProfileIconContainer = styled.div`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const MenuContainer = styled.div`
    position: absolute;
    z-index: 3;
    width: 120px;
    background-color: white;
    top: 50px;
    right: 0px;
    border-bottom-left-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
`

const MenuButton = styled.button`
    width: 100%;
    height: 40px;
    display: flex;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    align-items: center;
    justify-content: flex-end;
    font-size: 1em;

    &:hover {
        background-color: #A90000;
        color: white;
    }
`

/**
 * 
 * @param {*} logout - Logs out a user
 * @param {*} profile - Redirects user to their own profile page
 */
export const ProfileIcon = ({ logout, profile }) => {

    const [showMenu, setShowMenu] = useState(false);
    const profileRef = useRef(null)
    const profileImage = useSelector(profilePictureSelector);

    // Adds event listener to profile container
    // which detects outside clicks
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
               setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [profileRef])


    const hideMenu = () => {
        setShowMenu(false);
    }

    return (
        <ProfileIconContainer ref={profileRef}>
            <Icon src={profileImage ? profileImage : default_pic} onClick={() => setShowMenu(!showMenu)}/>
            {
                showMenu
                &&
                <Menu hideMenu={hideMenu} logout={logout} profile={profile}/>
            }
        </ProfileIconContainer>
    )
}

/**
 * Menu shown when user clicks on the profile component
 * @param {*} logout - Logs out a user
 * @param {*} profile - Redirects user to their own profile
 * @param {*} hideMenu - Hides the component
 */
const Menu = ({ logout, profile, hideMenu }) => {

    return (
        <MenuContainer>
            <MenuButton onClick={() => { profile(); hideMenu(); }}> Profile</MenuButton>
            <MenuButton onClick={() => { logout(); hideMenu(); }}>Logout</MenuButton>
        </MenuContainer>
    )
}

export default ProfileIcon;