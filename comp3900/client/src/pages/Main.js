import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSocket, socketSelector, usernameSelector } from '../redux/features/userSlice';
import { 
    addPrivateMessage,
    currentFriendSelector,
    fetchConnectionRequests,
    fetchConnections,
    friendsLoadedSelector
} from '../redux/features/friendsSlice';
// Components
import styled from 'styled-components';
import MainDisplay from '../components/Main/MainDisplay'
import FriendSlider from '../components/Main/FriendSlider';
import TaskSlider from '../components/Main/TaskSlider';
import MainTaskBar from '../components/Main/MainTaskBar';
import TaskDisplay from '../components/Main/TaskDisplay';
// Socket.io
import { io } from 'socket.io-client';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
    min-width: 1100px;
    max-width: 1200px;
    height: max(100%, 800px);
    box-sizing: border-box;
`

const MainBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: 1rem;
    height: max(500px, 100%);
    box-sizing: border-box;
`
// Socket of the current user
const socket = io.connect('http://localhost:5000', { autoConnect: false })

/**
 * Page component for the route /main
 */
const Main = ({ token }) => {

    // React
    const history = useHistory();

    const [mode, setMode] = useState("Tasks");
    const [taskStats, setTaskStats] = useState(undefined);

    const [searchQuery, setSearchQuery] = useState(undefined);
    const dispatch = useDispatch();
    const friendsLoaded = useSelector(friendsLoadedSelector);
    const username = useSelector(usernameSelector);
    const selectedFriend = useSelector(currentFriendSelector);
    const socketExists = useSelector(socketSelector);

    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
        // Retrieves the user's friend requests
        dispatch(fetchConnectionRequests(token));

        if (!socketExists) {
            socket.auth = { username };
            // Sets up the sockets for online users
            socket.on("users", (users) => {
                users.forEach((user) => {
                    if (user.userID === socket.id) {
                        dispatch(setSocket({ socketId: socket.id, socket }));
                    };
                });
                dispatch(fetchConnections({ token, onlineFriends: users }));
            })

            socket.on("user connected", (users) => {
                dispatch(fetchConnections({ token, onlineFriends: users }));
            })

            socket.on("user disconnected", (users) => {
                dispatch(fetchConnections({ token, onlineFriends: users }));
            })

            socket.on("private message", ({ content, from }) => {
                // console.log("here")
                dispatch(addPrivateMessage({ content, from }))
            });

            socket.connect()
        }
    // eslint-disable-next-line
    }, [history, token, username])

    // Sends the payload to the current selected user
    const sendMessage = (payload) => {
        if (selectedFriend.online !== undefined) {
            socket.emit("private message", {
                content: payload,
                to: selectedFriend.socketId
            })
        }
    }

    return (
        <MainContainer>
            <MainTaskBar token={token} mode={mode} setMode={setMode} setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
            <MainBody>
                {
                    mode === 'Friends' ?
                    <>
                        <FriendSlider />
                        <MainDisplay sendMessage={sendMessage} friendsLoaded={friendsLoaded} />
                    </>
                    :
                    <>
                        <TaskSlider token={token} taskStats={taskStats}/>
                        <TaskDisplay token={token} searchQuery={searchQuery} setTaskStats={setTaskStats}/>
                    </>
                }
            </MainBody>
        </MainContainer>
    )
}

export default Main
