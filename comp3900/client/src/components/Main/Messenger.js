import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { tokenSelector, userDetailsSelector, usernameSelector } from '../../redux/features/userSlice';
import {
    addMessage,
    currentFriendSelector,
    fetchMessages,
    messagesLoadedSelector,
    messagesSelector,
    removeFriend
} from '../../redux/features/friendsSlice';
// Components
import styled from 'styled-components';
import { BiDotsVerticalRounded } from 'react-icons/bi'

// API
import { deleteConnection } from '../../api/connections';
import { postMessage } from '../../api/messages';

// Styled components
const MessengerContainer = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
`

const UserInfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    border-bottom: 1px solid black;
`

const UserInfo = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
`

const MessagingBodyWrapper = styled.div`
    width: 100%;
    overflow-y: scroll;
    height: 80%;
    max-height: 500px;
`

const MessagingBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 7;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        background: transparent;
    }
`

const MessagingInput = styled.textarea`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-top: 1px solid black;
    border-bottom: none; 
    border-left: none;
    border-right: none;
    outline: none;
    margin-top: 0.5rem;
    resize: none;
`

const DotButtons = styled(BiDotsVerticalRounded)`
    cursor: pointer;
    user-select: none;
`

const ButtonGroup = styled.div`
    position: relative;
`

const FriendMenuContainer = styled.div`
    background-color: white;
    overflow: hidden;
    width: 150px;
    position: absolute;
    right: 0px;
    top: 35px;
    border-bottom-left-radius: 10px;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
`

const FriendMenuButton = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 0.5rem;
    border: none;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        background-color: #A90000;
        color: white;
    }
`

const NoFriendsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const MessageContainer = styled.p`
    width: 100%;
    background-color: ${props => props.isSender ? "lightgray" : "white"};
    min-height: 60px;
    text-align: ${props => props.isSender ? "right" : "left"};
    margin: 0px;
    border-bottom: 1px white solid;
`

/**
 * Message component of Messenger
 * @param {*} isSender - Checks if the sender is the current user
 * @param {*} name - Name of the sender
 * @param {*} message - Message content 
 */
const Message = ({ isSender, name, message }) => {

    return (
        <MessageContainer
            isSender={isSender}
        >
            <span
                style={{
                    fontWeight: 'bold'
                }}
            >
                {name}
            </span>
            <p
                style={{
                    marginTop: '0rem',
                    paddingLeft: !isSender && '0.5rem',
                    paddingRight: isSender && '0.5rem'
                }}
            >
                {message}
            </p>
        </MessageContainer>
    )
}

/**
 * Component that allows users to delete and view another user's profile
 * @param {*} setShowMenu - Determines if the menu is shown or not
 * @param {*} deleteFriend - Deletes the friend
 * @param {*} friendUsername - Username of the friend 
 */
const FriendMenu = ({ setShowMenu, deleteFriend, friendUsername }) => {

    const history = useHistory();

    const handleProfileClick = () => {
        setShowMenu(false);
        history.push('/profile/' + friendUsername);
    }

    return (    
        <FriendMenuContainer>
            <FriendMenuButton onClick={handleProfileClick}>View Profile</FriendMenuButton>
            <FriendMenuButton onClick={deleteFriend}>Delete Friend</FriendMenuButton>
        </FriendMenuContainer>
    )
}

/**
 * Main messenger component 
 * @param {*} sendMessage - Sends the message to the other user
 */
const Messenger = ({ sendMessage }) => {

    const [showMenu, setShowMenu] = useState(false);
    const [message, setMessage] = useState('');

    const friend = useSelector(currentFriendSelector);
    const token = useSelector(tokenSelector);
    const username = useSelector(usernameSelector);
    const user = useSelector(userDetailsSelector);
    const messagesLoaded = useSelector(messagesLoadedSelector);
    const messages = useSelector(messagesSelector);

    const DotMenuRef = useRef(null);
    const MessagingWrapperRef = useRef(null);

    const dispatch = useDispatch();

    const deleteFriend = async () => {
        try {
            await deleteConnection(token, friend.username);
            dispatch(removeFriend());
            setShowMenu(false);
        }
        catch(e) {
            alert(e);
        }
    }

    // Retrieves all the messages with the current user and selected friend
    useEffect(() => {
        if (friend) {
            dispatch(fetchMessages({ token, sender: username, receiver: friend.username }));
        }
    // eslint-disable-next-line
    }, [friend])
    
    useEffect(() => {
        if (MessagingWrapperRef && MessagingWrapperRef.current) {
            MessagingWrapperRef.current.scrollTop = MessagingWrapperRef.current.scrollHeight;
        }
    }, [messages])

    const renderMessages = () => {
        if (messagesLoaded) {
            return messages.map(({ message_sender, message_text }) => {
                // Checks if the sender is the current user
                const isSender = message_sender.toString() === user.id.toString()
                return (
                    <Message
                        isSender={isSender}
                        name={isSender ? "You" : friend.name}
                        message={message_text}
                    />
                )
            })
        }
    }

    // Detects outslide clicks of the friend menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (DotMenuRef.current && !DotMenuRef.current.contains(e.target)) {
               setShowMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [DotMenuRef])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postMessage(token, username, friend.username, message);
            const payload = response.data;
            sendMessage(payload)
            dispatch(addMessage(payload))
            MessagingWrapperRef.current.scrollTop = MessagingWrapperRef.current.scrollHeight;
        } catch (e) {
            alert('Could not send message at this time. Please try again');
        }

        setMessage('')
    }
    
    const handleMessageChange = (e) => {
        if (e.target.value.length > 500) {
            return;
        }
        setMessage(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && message.length > 0) {
            handleFormSubmit(e);
        }
    }
 
    return (
        <MessengerContainer onSubmit={handleFormSubmit}>
            {
                friend ?
                <>
                    <UserInfoContainer>
                        <UserInfo>
                            { friend.name }
                        </UserInfo>
                        <ButtonGroup ref={DotMenuRef}>
                            <DotButtons onClick={() => setShowMenu(!showMenu)} size={30}/>
                            {
                                showMenu &&
                                <FriendMenu friendUsername={friend.username} deleteFriend={deleteFriend} setShowMenu={setShowMenu} />
                            }
                        </ButtonGroup>
                    </UserInfoContainer>
                    <MessagingBodyWrapper ref={MessagingWrapperRef}>
                        <MessagingBody>
                            {
                                renderMessages()
                            }
                        </MessagingBody>
                    </MessagingBodyWrapper>
                    <MessagingInput onKeyDown={handleKeyDown} onChange={handleMessageChange} value={message} />
                </>
                :
                <NoFriendsContainer>
                    Found no friends here...
                </NoFriendsContainer>
            }

        </MessengerContainer>
    )
}

export default Messenger
