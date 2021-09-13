import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// Components
import styled from 'styled-components'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BsFilterLeft } from 'react-icons/bs'
import TaskSearchForm from './TaskSearchForm'
import { IoMdRefresh } from 'react-icons/io'


// Styled components
const MainTaskBarContainer = styled.div`
    width: 100%;
    height: 50px;
    margin-top: 2rem;
    display: flex;
    align-items: center;
`

const CreateTaskButtonContainer = styled.button`
    background-color: #A90000;
    width: 200px;
    height: 80%;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    font-weight: 500;
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #D50000;
    }

`

const AddCircle = styled(AiFillPlusCircle)`
    color: white;
    margin-left: 0.5rem;
`

const FriendTaskButtonGroup = styled.div`
    display: flex;
    width: 200px;
`

const FriendsButton = styled.button`
    width: 90px;
    cursor: pointer;
    margin-right: 0.8rem;
    padding: 0.5rem;
    border-radius: 7px;
    border: none;
    background-color: #847F7F;
    color: white;

    &:hover {
        filter: brightness(0.9);
    }

    :active {
        filter: brightness(0.7);
    }
`

const TasksButton = styled.button`
    width: 90px;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    background-color: #4B4B4B;
    color: white;

    &:hover {
        filter: brightness(0.9);
    }

    :active {
        filter: brightness(0.7);
    }
`

const TaskHeaderContainer = styled.div`
    display: flex;
    flex: 1;
    padding-left: 60px;
    font-weight: bold;
    align-items: center;
    padding-right: 100px;
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


/**
 * The task button used to route to the create a task page
 * @param {*} onClick - Function to handle the click of the button
 *
 */
const CreateTaskButton = ({ onClick }) => (
    <CreateTaskButtonContainer onClick={onClick}>
        Create New Task
        <AddCircle />
    </CreateTaskButtonContainer>
)

/**
 * The task bar used when the tasks toggle is selected
 * @param {*} token - User token
 * @param {*} mode - String flagging whether this component should be shown
 * @param {*} setMode - UseState function to set mode
 * @param {*} searchQuery - Current search Query selected
 * @param {*} searchQuery - Usestate function to set searchQuery
 */
const MainTaskBar = ({ token, mode, setMode, searchQuery, setSearchQuery}) => {

    const history = useHistory();
    const [showFilter, setShowFilter] = useState(false);

    const handleCreateTaskClick = () => {
        history.push('/task/create');
    }

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    }

    return (
        <MainTaskBarContainer>
            <FriendTaskButtonGroup>
                <FriendsButton
                    onClick={() => setMode('Friends')}
                >
                    Friends
                </FriendsButton>
                <TasksButton
                    onClick={() => setMode('Tasks')}
                >
                    Tasks
                </TasksButton>
            </FriendTaskButtonGroup>
            {mode === "Tasks" && 
            <TaskHeaderContainer>
                <span
                    style={{
                        flex: 1
                    }}
                >
                    {searchQuery ? "Filtered Tasks" : "Your Tasks"}
                </span>

                <FilterButton onClick={handleFilterClick}>
                    Filter
                    <BsFilterLeft/>
                </FilterButton>
                <FilterButton onClick={() => setSearchQuery(undefined)}>
                    Clear
                    <RefreshIcon/>
                </FilterButton>
            </TaskHeaderContainer>}
            {mode === "Tasks" && <CreateTaskButton onClick={handleCreateTaskClick} />}
            {mode === "Tasks" && <TaskSearchForm token={token} show={showFilter} setShowFilter={setShowFilter} setSearchQuery={setSearchQuery} onProfile={false}/>}
        </MainTaskBarContainer>
        
    )
}

export default MainTaskBar
