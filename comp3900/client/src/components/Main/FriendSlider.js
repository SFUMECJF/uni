import React, { useState } from 'react';
// Components
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io'
import { ImCheckmark, ImCross } from 'react-icons/im'
// Redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { removeRequest, approveRequest, selectFriend, friendsLoadedSelector } from '../../redux/features/friendsSlice';
import { tokenSelector } from '../../redux/features/userSlice';
// API
import { acceptFriendRequest, rejectFriendRequest } from '../../api/connections';
import { useHistory } from 'react-router-dom';

// Styled components
const FriendTaskSliderContainer = styled.div`
    height: 90%;
    background-color: #847F7F;
    width: 200px;
    border-radius: 10px;
    padding-top: 1rem;
    box-sizing: border-box;
    overflow-y: hidden;
    user-select: none;
`

const FriendContainer = styled.div`
    background-color: ${props => props.selected && "#A90000"};
    display: flex;
    flex: 1;
    justify-content: flex-start;
    padding-left: 1rem;
    color: white;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    padding-left: 1rem;
    height: 30px;

    ${props => !props.selected && `&:hover {
        background-color: #545454;
    }`}
`

const FriendName = styled.span`
    flex: 1;
    user-select: none;
    cursor: pointer;

    &:hover {
        filter: brightness(0.9);
    }
`

const OnlineCircle = styled.div`
    height: 10px;
    width: 10px;
    ${props => props.online ? 
    `
        background-color: #00B960;
    `
    :
    `
        border: solid 2px white;
    `
    };
    border-radius: 50%;
    box-sizing: border-box;
    margin-right: 0.5rem;
`


const PendingRequestsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    margin-bottom: 1rem;
`

const PendingTopSection = styled.div`
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    height: 30px;
    margin-bottom: 0.5rem;

    &:hover {
        background-color: #545454;
    }
`

const PendingCircle = styled.div`
    width: 18px;
    height: 18px;
    background-color: #C45E00;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.8em;
    margin-left: 0.5rem;
`

const PendingRequest = styled.div`
    width: 80%;
    display: flex;
    height: 40px;
    align-items: center;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    background-color: #545454;
    border-radius: 10px;
    font-size: 0.9em;
`

const PendingButtons = styled.div`
    align-items: center;
    justify-content: center;
`

const PendingApprove = styled(ImCheckmark)`
    color: #00B960;
    cursor: pointer;
`

const PendingDecline = styled(ImCross)`
    color: red;
    cursor: pointer;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`

const PendingDownArrow = styled(IoIosArrowDown)`
    color: white;
    margin-left: 0.5rem;
    ${props => props.showRequests && "transform: rotate(180deg);"}
`
/**
 * 
 * @param {*} name - Name of the friend
 * @param {*} onClick - Shows friend on the MainDisplay component
 * @param {*} selected - Checks if the user is currently selected
 * @param {*} online - Shows if the user is online
 */
const Friend = ({ name, onClick, selected, online }) => (
    <FriendContainer selected={selected} onClick={onClick}>
        <FriendName>
            {name}
        </FriendName>
        <OnlineCircle online={online} />
    </FriendContainer>
)

// Shortens the name of the user if it is too long
const truncateName = (name) => {
    if (name.length > 13) {
        name.substring(0, 13);
        name += '...';
    }
    
    return name;

}

/**
 * Contains the requests the current user has not declined/approved
 * @param {*} requests - List of request the user has
 * @param {*} token - Authentication token of the user
 * @returns 
 */
const PendingRequests = ({ requests, token }) => {

    const [showRequests, setShowRequest] = useState(false);

    const handleApproveRequest = async (idx, username) => {
        try {
            await acceptFriendRequest(token, username);
            dispatch(approveRequest({ index: idx }));
        }
        catch (e) {
            alert(e);
        }
        
    }

    const handleRejectRequest = async (idx, username) => {
        try {
            await rejectFriendRequest(token, username);
            dispatch(removeRequest({ index: idx }))
        }
        catch (e) {
            alert(e);
        }
    }

    const history = useHistory();
    const dispatch = useDispatch();

    const viewProfile = (username) => {
        history.push('/profile/' + username);
    }

    return (
        <PendingRequestsContainer>
            <PendingTopSection onClick={() => setShowRequest(!showRequests)}>
                <span>Pending</span>
                <PendingCircle>
                    {requests.length}
                </PendingCircle>
                <PendingDownArrow requestsLength={requests.length} showRequests={showRequests} />
            </PendingTopSection>
            {
                showRequests &&
                requests.map(({ name, username }, idx) => (
                    <PendingRequest>
                        <FriendName onClick={() => viewProfile(username)}>
                            { truncateName(name) }
                        </FriendName>
                        <PendingButtons>
                            <PendingApprove onClick={() => handleApproveRequest(idx, username)}/>
                            <PendingDecline onClick={() => handleRejectRequest(idx, username)}/>
                        </PendingButtons>
                    </PendingRequest>
                ))
            }
        </PendingRequestsContainer>
    )
}

const mapStateToProps = ({ friends }) => ({
    friends: friends.connections,
    requests: friends.requests,
    selectedUser: friends.selectedFriend
})

/**
 * Main component of the FriendsSlider component
 * @param {*} friends - List of friends the user has
 * @param {*} requests - List of friend requests the user hasn't declined/approved
 * @param {*} selectedUser - Determines which user is currently selected to be shown on MainDisplay
 */
const FriendSlider = ({ friends, requests, selectedUser }) => {

    const dispatch = useDispatch();

    const handleFriendClick = (idx) => {
        dispatch(selectFriend({ index: idx }))
    }

    const token = useSelector(tokenSelector);
    const friendsStateLoaded = useSelector(friendsLoadedSelector);

    return (
        <FriendTaskSliderContainer>
            {
                friendsStateLoaded &&
                <>
                    <PendingRequests
                        requests={requests}
                        token={token}
                    />
                    <>
                    {
                        friends.map(({ name, online, username }, idx) => {
                            return ( 
                                <Friend
                                    name={truncateName(name)}
                                    onClick={() => handleFriendClick(idx)}
                                    selected={idx === selectedUser}
                                    online={online}
                                />
                            )
                        })
                    }
                    </>
                </>
            }

        </FriendTaskSliderContainer>
    )
}

export default connect(mapStateToProps)(FriendSlider);
