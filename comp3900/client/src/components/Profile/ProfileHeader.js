import React from 'react';
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
import { cancelFriendRequest } from '../../api/profile';
import { getUserDetails, userUpdateDetails, getUserDetailsToken } from '../../api/profile';
import { deleteConnection, rejectFriendRequest } from '../../api/connections';


const RmFriendBtn = styled.button`
    display: flex;
    aligh-items: flex-start;
    border-radius: 5px;
    color: white;
    width: 80px;
    height: 38  px;
    border: none;
    outline: none;
    padding-right: 1rem;

    background-color: #A90000;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }
`

const ProfileContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: ${props => (props.mode === 'self'? 'flex-end' : 'flex-start')};
    width: 100%; 
`

const EmptyDiv = styled.div`
    height: 30px;  
    margin-top: 0.5rem;  
`

/**
 * Header component on the profile page
 * @param {*} token - Current token
 * @param {*} mode - boolean to communicate whether this is the users profile, or a difference profile
 * @param {*} isFriend - boolean to show whether person is friend
 * @param {*} setIsFriend - useState function for the isFriend pop
 * @param {*} isPending - boolean to check whether there is an outgoing friend request
 * @param {*} setIsPending - useState function for isPending prop
 * @param {*} isRequested - Checks whether there is an incoming friend request is 
 * @param {*} setIsRequested - useState function for isRequested prop
 * @param {*} username - username of the current profile
 * @param {*} currentUsername - Username of current user
 */
export const ProfileHeader = ({token, mode, isFriend, setIsFriend, isPending, setIsPending, isRequested, setIsRequested, username, currentUsername}) => {

    const [isPrivate, setIsPrivate] = React.useState(false);
    React.useEffect(() => {
        getUserDetailsToken(token, currentUsername).then(data => {
            setIsPrivate(data.data[0]["isPrivate"])
        })
    // eslint-disable-next-line 
    }, [])

    function changePrivacy(isPrivate) {
        getUserDetails(token, currentUsername).then(data => {
            const id = data.data[0]["id"]
            const first_name = data.data[0]['first_name']
            const last_name = data.data[0]['last_name']
            const profile_picture = data.data[0]["profile_picture"]
            const company = data.data[0]["company"]
            const email = data.data[0]['email']

            userUpdateDetails(token, id, first_name, last_name, profile_picture, company, currentUsername, email, isPrivate)
        });
    }

    const toggleSwitch = () => {
        changePrivacy(!isPrivate)
        if (isPrivate) {
            setIsPrivate(false);
            

        }
        else {
            setIsPrivate(true)
        }
        
    }

    const handleClick = () => {
        setIsFriend(false);
        deleteConnection(token, username);
        setIsPending(false)
    };

    const handleClickRequest = () => {
        setIsRequested(false);
        rejectFriendRequest(token, username);
        setIsPending(false)
    };

    const handleClickCancel = () => {
        cancelFriendRequest(token, username);
        setIsPending(false)
    };


    const renderMode = () => {
        if (mode === 'self') {
            return <FormControlLabel checked={isPrivate}
                        control={
                        <Switch
                            onChange={toggleSwitch}
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label={'Private'}
                        />  
 
        } else if (isFriend === true) {
            return <RmFriendBtn onClick={handleClick}>
                        Remove Friend
                    </RmFriendBtn>
        
        } else if (isRequested === true) {
                return <RmFriendBtn onClick={handleClickRequest}>
                Reject Request
            </RmFriendBtn>                
        }
        else if (isPending === true) {
            return <RmFriendBtn onClick={handleClickCancel}>
            Cancel Request
        </RmFriendBtn>            
        }
        else { 
            return <EmptyDiv/>
        }
    }

    return (<ProfileContainer mode={mode}>
                {renderMode()}
            </ProfileContainer>
    )
}

export default ProfileHeader
// onClick={setIsFriend(false)}