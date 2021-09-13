import React, {useEffect} from 'react';
import styled from 'styled-components';
import default_pic from '../components/Profile/pic.png'
import ProfilePic from '../components/Profile/ProfilePic'
import Task from '../components/Task/Task'
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { useParams } from 'react-router-dom';
import icon from '../components/Profile/pic.png'
import { getFriends, getUserDetails, userUpdateDetails, addFriend, cancelFriendRequest, getSentRequests, getFriendRequests, getUserDetailsId} from '../api/profile'
import { useDispatch, useSelector } from 'react-redux';
import { profilePictureSelector, setProfilePicture, usernameSelector, idSelector } from '../redux/features/userSlice';
import { acceptFriendRequest } from '../api/connections';
import { removeFriendByUsername } from '../redux/features/friendsSlice';
import { getTasksFromId, getTasksFromQuery} from '../api/task'
import TaskHeader from '../components/Task/TaskHeader';
import TaskDetailProfile from '../components/Profile/TaskDetailProfile';
import { BsFilterLeft } from 'react-icons/bs'
import { IoMdRefresh } from 'react-icons/io'
import TaskSearchForm from '../components/Main/TaskSearchForm';


const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-bottom: 1rem;
    padding-left: 1rem;
    width: 100%;
    min-width: 1100px;
    max-width: 1200px;
    height: max(100%, 800px);
    box-sizing: border-box;
`
const Name = styled.p`
    margin-top: 0.5;
    margin-bottom: 0.5rem;
    font-size: 1.2em;
    height: 29px;

`

const EmailContainer = styled.p`
    margin-top: 0;
    margin-bottom: 0.5rem;   
    font-size: 1em;
`
const ProfileContainer = styled.div`
    margin-top: 0.5rem;

    width: 680px;
    height: 850px;
    background-color: #C0C0C0;
    box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.25);
    flex-direction: column;
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
`
const AddFriendBtn = styled.button`
    border-radius: 5px;
    color: white;
    width: 140px;
    height: 30px;
    border: none;
    outline: none;
    align-items: center;

    background-color: ${props => (props.selected ? 'grey' : '#A90000')};
    cursor: pointer;
    font-size: 1em;
    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }
`
const FriendsBtn = styled.button`
    border-radius: 5px;
    color: white;
    width: 140px;
    height: 30px;
    border: none;
    outline: none;

    background-color: green;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }
`
const PicLabel = styled.label`
    margin-top: 0.5rem;
    border-radius: 5px;
    color: white;
    width: 150px;
    height: 45px;
    border: none;
    outline: none;

    background-color: #A90000;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }
    padding: 5px;
`

const PicInput = styled.input`
    display: none;
`

const UploadDisplay = styled.div`
    height: 20px
`

const TaskDisplayContainer = styled.div`
    display: flex;
    allign-items: center;
    width: 650px;
    height: 230px;
    flex-direction: column;
    padding-right: 2rem;
    padding-left: 0rem;
    padding-right: 1rem;
    overflow-y: ${props => props.overflow ? "auto" : "hidden"}
`

const BusynessContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding-right: 1rem;
`

const FilterButton = styled.button`
    background-color: gray;
    color: white;
    border: none;
    outline: none;
    padding: 0.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px 20px;
    &:hover {
        background-color: #007ABE;
    }
    cursor: pointer;
    margin-right: 1rem;
`

const RefreshIcon = styled(IoMdRefresh)`
    color: white;
`

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const Instruction = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    padding-top: 3rem;
`

const InstructionTasks = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 30px;
    padding-top: 1rem;
    width: 600px;
`
/**
 * Profile Page for users to view their own and others profiles
 * @param {*} token - Current token
 */
const Profile = ({ token }) => {
    const [mode, setMode] = React.useState('self');
    const [isPending, setIsPending] = React.useState(false);
    const [isFriend, setIsFriend] = React.useState(false); 
    const [isRequested, setIsRequested] = React.useState(false);

    const [first_name, setFirst_Name] = React.useState('')
    const [last_name, setLast_Name] = React.useState('')
    const [company] = React.useState('')
    const [pic, setPic] = React.useState(icon)
    const [id, setId] = React.useState(-1)
    const [email, setEmail] = React.useState('')
    const [tasks, setTasks] = React.useState(false)
    const [apiLoaded, setApiLoaded] = React.useState(false)
    const [detailedTask, setDetailedTask] = React.useState(undefined);
    const [state, setState] = React.useState(undefined)
    const [busyness, setBusyness] = React.useState(undefined);
    const [searchQuery, setSearchQuery] = React.useState(undefined);
    const [showFilter, setShowFilter] = React.useState(false);
    const { username } = useParams();

    // Username of the currenty logged in user
    const currentUsername = useSelector(usernameSelector);
    const profilePicture = useSelector(profilePictureSelector);
    const currentId = useSelector(idSelector)

    const dispatch = useDispatch();

    const labels = {
        1: '0%',
        2: '25%',
        3: '50%',
        4: '75%',
        5: '100%',
        6: '100+%',
      };


    useEffect(() => {
        getUserDetails(token, username).then(data => {
            setFirst_Name(data.data[0]["first_name"])
            setLast_Name(data.data[0]["last_name"])
            if (data.data[0]["username"] === currentUsername) {
                setMode('self')
                setPic(profilePicture);
            } else {
                setMode('other');
                if (data.data[0]["profile_picture"] === "") {
                    setPic()
                } else {
                    setPic(data.data[0].profile_picture)
                }
            }
            setId(data.data[0]["id"])
            setEmail(data.data[0]["email"])
            getUserDetailsId(token, data.data[0]["id"]).then(data => {
                setBusyness(labels[data.data.busyness])
            })
        })
        getSentRequests(token).then(data => {
            const requests = data.data
            for (var i = 0; i < requests.length; i++) {
                if(requests[i]["username"] === username){
                    setIsPending(true)
                }
            }
        })
        getFriendRequests(token).then(data => {
            const requests = data.data
            for (var i = 0; i < requests.length; i++) {
                if(requests[i]["username"] === username){
                    setIsRequested(true);
                }
            }
        });

        getFriends(token).then(data => {
            const requests = data.data
            for (var i = 0; i < requests.length; i++) {
                if(requests[i]["username"] === username){
                    setIsFriend(true);
                }
            }
        })


    }, [username]);

    useEffect(() => {
    if (id !== -1) {
        if (searchQuery) {
            getTasksFromQuery(token, searchQuery, id).then(taskData => {
                setTasks(taskData.data);
            }).then(() => setApiLoaded(true))
        } else {
            getTasksFromId(token, id).then(taskData => {
                setTasks(taskData.data);
            }).then(() => setApiLoaded(true))
        }
    }
    }, [id, searchQuery, token])

    const handleClick = () => {
        if (isPending) {
            setIsPending(false);
            cancelFriendRequest(token, username, id)
        } else {
            setIsPending(true);
            addFriend(token, username)
        }

    }

    const handleClickAccept = async () => {
        if (isRequested) {
            setIsRequested(false);
            await acceptFriendRequest(token, username);
            dispatch(removeFriendByUsername({ username }))
            setIsFriend(true)
        }
    }

	const changeHandler = (event) => {
        const profile_picture = event.target.files[0];
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        toBase64(profile_picture)
        .then((base64image) => {
            setPic(base64image)
            dispatch(setProfilePicture({ picture: base64image }))
            userUpdateDetails(token, id, first_name, last_name, base64image, company, username, email)
        })
        .catch(e => {
            alert(e);
        })

	};



    const renderBtn = () => {
        if (mode === "other") {
            if (isFriend) {
                return <FriendsBtn>
                    Friends
                </FriendsBtn>
            }
            else if (isRequested) {
                return <AddFriendBtn selected={isRequested} onClick={handleClickAccept}>
                {isRequested ? "Accept Request" : "Friends"}
                </AddFriendBtn>
            }
            else {
                return <AddFriendBtn selected={isPending} onClick={handleClick}>
                {isPending ? "Pending" : "Add Friend"}
                </AddFriendBtn>
            }
        } else {    
            return <UploadDisplay>
                    <PicLabel for="file_upload">
                        Upload Picture
                    </PicLabel>
                    <PicInput id="file_upload" type="file" name="file" onChange={changeHandler}/>
                </UploadDisplay>
        }

        
    }


    const renderTasks = () => {
        if(tasks === undefined) {
            return (<TaskDisplayContainer/>);
        } else {
            var canEdit = false;
            if (username === currentUsername) {
                canEdit = true;
            }
            tasks.sort(function(a,b){
                if (a.due_date === null) {
                    return 1;
                }
                else if (b.due_date === null) {
                    return -1;
                } else {
                    return new Date(a.due_date) - new Date(b.due_date);
                }
            });
            console.log("Current ID", currentId);
            console.log(tasks);
            const TaskItems = tasks.map((t) => <Task token={token} taskData={t} setDetailedTask={setDetailedTask} setState={setState} canClick={true} canEdit={canEdit || t.created_by == currentId}/>);
            var overflow = false;
            if (tasks.length > 3) {
                overflow = true;
            }
            return (
                <TaskDisplayContainer overflow={overflow}>
                {tasks.length === 0 ? searchQuery ? <InstructionTasks> No Tasks Found </InstructionTasks> : <InstructionTasks> Created Tasks will be Shown Here </InstructionTasks>: TaskItems }
                </TaskDisplayContainer>
            );
        }
    }


    return (
        <MainContainer>
            <ProfileContainer>
            <ProfileHeader token={token} mode={mode} isFriend={isFriend} setIsFriend={setIsFriend} isPending={isPending} setIsPending={setIsPending} username={username} currentUsername={currentUsername} isRequested={isRequested} setIsRequested={setIsRequested}/>
                <ProfilePic icon1={(pic === undefined || pic === '') ? default_pic : pic}/>
                <Name>
                    {first_name} {last_name}
                </Name>
                <EmailContainer>
                    {email}
                </EmailContainer>
                {renderBtn()}
                {(isFriend || username === currentUsername)
                 ?
                 <RowContainer>
                <BusynessContainer>
                    Busyness Estimate: {busyness ? busyness : ""}
                </BusynessContainer>
                <FilterButton onClick={() => setShowFilter(!showFilter)}>
                    Filter
                    <BsFilterLeft/>
                    </FilterButton>
                    <FilterButton onClick={() => setSearchQuery(undefined)}>
                    Clear
                    <RefreshIcon/>
                </FilterButton>
                <FilterContainer>

                {showFilter && <TaskSearchForm token={token} show={showFilter} setShowFilter={setShowFilter} setSearchQuery={setSearchQuery} onProfile={true} profileId={id}/>}
                </FilterContainer></RowContainer> 
                :
                <Instruction>Add this Person as a Friend to see their Tasks</Instruction>}
                {(isFriend || username === currentUsername) && <TaskHeader/>}
                {apiLoaded && (isFriend || username === currentUsername) ? renderTasks() : <TaskDisplayContainer/>}
                {(isFriend || username === currentUsername) && <TaskDetailProfile token = {token} taskData={detailedTask} state={state} setState={setState} canEdit={false} isFriend={isFriend}/>}
            </ProfileContainer>
        </MainContainer>
        

    )
}

export default Profile