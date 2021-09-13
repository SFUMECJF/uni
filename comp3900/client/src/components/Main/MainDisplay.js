import React from 'react';
import styled from 'styled-components';
import Messenger from './Messenger';

const MainDisplayContainer = styled.div`
    flex: 1;
    background-color: white;
    border-radius: 10px;
    height: 90%;
    margin-left: 2rem;
    box-shadow: 1px -1px 44px -8px rgba(0, 0, 0, 0.1);
`

/**
 * The main Display component for the messaging functionality
 * @param {*} friendsLoaded - boolean flag to show whether friends have been loaded from back end
 * @param {*} setMode - function to send a message to node server
 */
const MainDisplay = ({ friendsLoaded, sendMessage }) => {

    return (
        <MainDisplayContainer>
            {
                friendsLoaded &&
                <Messenger sendMessage={sendMessage} />
            }
        </MainDisplayContainer>
    )
}

export default MainDisplay
