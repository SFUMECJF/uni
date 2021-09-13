import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// Components
import styled from 'styled-components'
import { 
    Radio, 
    TextField, 
    Dialog, 
    DialogTitle, 
    List, 
    ListItem, 
    Avatar, 
    ListItemAvatar,
    ListItemText
} from '@material-ui/core'
import default_pic from '../Profile/pic.png'
// Redux
import { useSelector } from 'react-redux'
import { userDetailsSelector } from '../../redux/features/userSlice'
// API
import { getFriends } from '../../api/connections'
import { createTask } from '../../api/tasks'


const FormContainer = styled.form`
    background-color: white;
    width: 800px;
    height: 600px;
    border-radius: 15px;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
`

const Heading = styled.div`
    height: 30px;
    font-weight: 700;
    border-bottom: solid 1px #A59D9D;
    margin-bottom: 1rem;
`

const FieldInput = styled.input`
    height: 30px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #847F7F;
    outline: none;
    padding-left: 1rem;
    font-family: Poppins;
    box-sizing: border-box;
`

const FieldLabel = styled.label`
`

const FieldGroup = styled.div`
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
`

const UserStoryContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const UserStoryInput = styled(FieldInput)`
    width: 40px;
    padding: 0;
    text-align: center;

`

const LeftFieldGroup = styled.div`
    width: 40%;
`

const AssigneeFieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const AssigneeGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
`

const AssigneeChangeText = styled.button`
    color: #007ABE;
    margin-left: 0.5rem;
    cursor: pointer;
    border: none;
    background: none;
`

const PriorityFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const PriorityButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const RightFieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60%;
`

const SummaryFieldContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1rem;
`

const SummaryTextAreaField = styled.textarea`
    width: 80%;
    height: 150px;
    font-family: Poppins;
    resize: none;
`

const DeadlineFieldContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`

const DeadlineCLear = styled.button`
    border: none;
    background-color: transparent;
    color: #007ABE;
    cursor: pointer;
    margin-top: 0.5rem;
    height: 50%;
`

const CancelSaveGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    height: 30%;
`

const Button = styled.button`
    margin-right: 1rem;
    height: 30px;
    border-radius: 6px;
    border: none;
    padding: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9em;
    cursor: pointer;
    box-sizing: border-box;
    width: 80px;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }
`

const FieldSet = styled.fieldset`
    height: 100%;
    width: 100%;
    border: none;
    padding: 1rem 1.5rem;
    box-sizing: border-box;
`

const AvatarIcon = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`

const AssigneeName = styled.span`
    font-weight: 400;
    font-size: 0.8em;
`

/**
 * The assignee field
 * @param {*} openModal - determines if modal is shown or not 
 * @param {*} name - name of assignee
 */
const AssigneeField = ({ openModal, name }) => (
    <AssigneeFieldContainer>
        <FieldLabel>
            Assignee
        </FieldLabel>
        <AssigneeGroup>
            <AssigneeName>
                { name }
            </AssigneeName>
            <AssigneeChangeText onClick={openModal} type="button">
                Change
            </AssigneeChangeText>
        </AssigneeGroup>
    </AssigneeFieldContainer>
)

/**
 * The priority field
 * @param {*} setPriority - Sets priority to either Low, Medium or High
 * @param {*} priority - Current priority chosen
 */
const PriorityField = ({ setPriority, priority }) => {

    const handleRadioClick = (e) => {
        setPriority(e.target.value)
    }

    return (
        <PriorityFieldContainer>
            <FieldLabel>
                Priority
            </FieldLabel>
            <PriorityButton>
                <Radio 
                    checked={priority === "Low"}
                    onClick={handleRadioClick}
                    value="Low"
                    style={{
                        color: 'green'
                    }}
                />
                <FieldLabel>
                    Low
                </FieldLabel>
            </PriorityButton>
            <PriorityButton>
                <Radio 
                    checked={priority === "Medium"}
                    value="Medium"
                    onClick={handleRadioClick}
                    style={{
                        color: 'orange'
                    }}
                />
                <FieldLabel>
                    Medium
                </FieldLabel>
            </PriorityButton>
            <PriorityButton>
                <Radio 
                    checked={priority === "High"}
                    value="High"
                    style={{
                        color: 'red'
                    }}
                    onClick={handleRadioClick}
                />
                <FieldLabel>
                    High
                </FieldLabel>
            </PriorityButton>
        </PriorityFieldContainer>
    )
}

const UserStoryField = ({ onChange, value }) => (
    <UserStoryContainer>
        <FieldLabel style={{
            marginTop: '1rem'
        }}>
            Story Points
        </FieldLabel>
        <UserStoryInput value={value} onChange={onChange} />
    </UserStoryContainer>
)

/**
 * The summary field
 * @param {*} onChange - handles the change of the textfield 
 * @param {*} value - current value of summary
 */
const SummaryField = ({ onChange, value }) => (
    <SummaryFieldContainer>
        <FieldLabel>
            Summary
        </FieldLabel>
        <SummaryTextAreaField value={value} onChange={onChange} />
    </SummaryFieldContainer>
)

/**
 * The deadline field
 * @param {*} onChange - handles the change of the textfield 
 * @param {*} value - current value of deadline
 * @param {*} clear - clears the deadline
 */
const DeadlineField = ({ onChange, value, clear }) => (
    <DeadlineFieldContainer>
        <div
            style={{
                flexDirection: 'column',
                display: 'flex'
            }}
        >
            <FieldLabel>
                Deadline
            </FieldLabel>
            <TextField
                onChange={onChange}
                id="date"
                type="date"
                value={value}
            />
        </div>
        <DeadlineCLear type="button" onClick={clear}>
            Clear
        </DeadlineCLear>
    </DeadlineFieldContainer>
)

/**
 * A modal which opens when the change assignee button is clicked
 * @param {*} open - Determines if modal is open 
 * @param handleClose - closes the modal
 * @param friends - list of friends the user is connected to
 * @param profilePicture - profile picture of the current user 
 * @param setSelectedFriend - assigns the user as the assignee
 */
const AssigneeModal = ({ open, handleClose, friends, profilePicture, setSelectedFriend }) => {

    const handleAvatarClick = (idx) => {
        setSelectedFriend(idx);
        handleClose();
    }   

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Assign Task</DialogTitle>
            <List>
                <ListItem onClick={() => handleAvatarClick(-1)} style={{ width: '300px' }} button>
                    <ListItemAvatar>
                        <Avatar>
                            <AvatarIcon src={profilePicture === "" ? default_pic : profilePicture} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Me" />
                </ListItem>
                {friends.length > 0 && friends.map(({ first_name, last_name, profile_picture }, idx) => (
                    <ListItem onClick={() => handleAvatarClick(idx)} style={{ width: '300px' }} button>
                        <ListItemAvatar>
                            <Avatar>
                                <AvatarIcon
                                    src={profile_picture === "" ? default_pic : profile_picture}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${first_name} ${last_name}`} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    )
}

/**
 * Main component of the task creat form
 */
const TaskCreateForm = () => {

    // Task create fields
    const [priority, setPriority] = useState("Low");
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(-1);
    const [storyPoints, setStoryPoints] = useState(1);
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const { token, username, profilePicture, id } = useSelector(userDetailsSelector);

    useEffect(() => {

        getFriends(token)
        .then(({ data }) => {
            setFriends(data);
        }).catch(() => {
            alert('Could not retrieve friends at this time.')
        })

    }, [token])

    // Submits the form
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (title.length < 1) {
            alert('Title cannot be empty');
            return;
        }

        setSubmitting(true);

        let assigned_to;

        // Checks if assigned to is current user or a friend
        if (selectedFriend === -1) {
            assigned_to = id
        } else {
            assigned_to = friends[selectedFriend].id
        }

        let new_deadline;

        if (deadline !== null) {
            new_deadline = deadline + 'T00:00:00Z'
        }
        else if (deadline === '') {
            new_deadline = null;
        }
        else {
            new_deadline = deadline;
        }

        try {
            await createTask(token, {
                title,
                summary,
                due_date: new_deadline,
                priority,
                created_by: id,
                assigned_to,
                story_points: storyPoints.toString(),
                // created_by: username,
            });
        } catch(error) {
            alert(error.response.data);
        }

        setSubmitting(false);
        history.push('/main')

    }

    // Handling form input changes
    const handleTitleChange = (e) => {
        const titleInput = e.target.value;

        if (titleInput.length > 100) {
            return;
        }

        setTitle(titleInput);
    }

    const handleSummaryChange = (e) => {
        const summary = e.target.value;

        if (summary.length > 300) {
            return;
        }

        setSummary(summary);
    }

    const handleDeadlineChange = (e) => {
        const deadline = e.target.value;
        setDeadline(deadline)
    }

    const handleCancelClick = () => {
        history.push('/main')
    }

    const handleStoryPointsChange = (e) => {
        const points = e.target.value;

        if ((/^[0-9\b]+$/.test(points) && points.length < 4) || points.length === 0) {
            setStoryPoints(points)
        }
    }


    return (
        <FormContainer onSubmit={handleFormSubmit}>
            <FieldSet disabled={submitting}>
                <Heading>
                    Create A Task
                </Heading>
                <FieldLabel htmlFor="TaskName">
                    Task Name
                </FieldLabel>
                <FieldInput onChange={handleTitleChange} value={title} name="TaskName" />
                <FieldGroup>
                    <LeftFieldGroup>
                        <AssigneeField
                            name={
                                selectedFriend === -1 ? 
                                "Me" 
                                : 
                                `${friends[selectedFriend].first_name} ${friends[selectedFriend].last_name}`
                            }
                            openModal={() => setOpen(true)}
                        />
                        <PriorityField priority={priority} setPriority={setPriority} />
                        <UserStoryField value={storyPoints} onChange={handleStoryPointsChange} />
                    </LeftFieldGroup>
                    <RightFieldGroup>
                        <SummaryField value={summary} onChange={handleSummaryChange} />
                        <DeadlineField clear={() => setDeadline('')} value={deadline} onChange={handleDeadlineChange}/>
                    </RightFieldGroup>
                </FieldGroup>
                <CancelSaveGroup>
                    <Button
                        type="button"
                        style={{
                            border: 'solid 1px black',
                            backgroundColor: 'white'
                        }}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        style={{
                            backgroundColor: '#007ABE',
                            color: 'white'
                        }}
                    >
                        Create
                    </Button>
                </CancelSaveGroup>
                <AssigneeModal
                    profilePicture={profilePicture}
                    username={username}
                    handleClose={() => setOpen(false)}
                    friends={friends}
                    open={open}
                    setSelectedFriend={setSelectedFriend}
                />
            </FieldSet>
        </FormContainer>
    )
}

export default TaskCreateForm
