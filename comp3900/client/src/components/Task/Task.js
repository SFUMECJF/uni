import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import { IoMdRadioButtonOn } from 'react-icons/io'
import { MdModeEdit, MdDeleteForever } from 'react-icons/md'
import { deleteTask } from '../../api/task'
import ToggleButton from './ToggleButton'
import { useHistory } from 'react-router-dom'
const TaskContainer = styled.div`
    margin-top: 0.5rem;
    cursor: pointer;
    width: 600px;
    height: 50px;
    background-color: white;
    box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.25);
    flex-direction: row;
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    margin-left: 2rem;
    margin-bottom: 1rem;
    justify-content: center;
`

const IDContainer = styled.div`
    display: flex;
    width: 50px;
    height: 50px;
    align-items: center;
    font-size: 0.8em;
    color: #AAAAAA;
`

const TaskNameContainer = styled.div`
    display: flex;
    width: 260px;
    height: 50px;
    align-items: center;
    font-size: 0.8em;
    padding-left: 0.5rem;
`

const PriorityContainer = styled.div`
    display: flex;
    width: 110px;   
    height: 50px;
    align-items: center;
    font-size: 0.8em;
`

const RedIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: red;
    padding-right: 0.5rem;
`

const YellowIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: #C57600;
    padding-right: 0.5rem;
`

const GreenIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: green;
    padding-right: 0.5rem;
`

const DeadlineContainer = styled.div`
    display: flex;
    width: 100px;
    height: 50px;
    align-items: center;
    font-size: 0.8em;
`



const EditButton = styled(MdModeEdit)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    padding-left: 0.5rem;
`

const DeleteButton = styled(MdDeleteForever)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    padding-left: 0.2rem;
    color: #A90000;
`

/**
 * Header component on the profile page
 * @param {*} token - Current token
 * @param {*} taskData - Task Data
 * @param {*} setDetailedTask - useState function to set the detailed task to be viewed
 * @param {*} setState - useState function to set the state of the task
 * @param {*} canEdit - boolean to show whether a user can edit this task
 * @param {*} canClick - boolean to show whether a use can click this task
 */
function Task({token, taskData, setDetailedTask, setState, canEdit, canClick}) {
    
    const [showTask, setShowTask] = useState(true);
    const history = useHistory();


    const handleDelete = () => {
        deleteTask(token, taskData.id)
        setShowTask(false)
    }


    const renderIcon = () => {
        switch(taskData.priority) {
            case "High":
                return <RedIcon/>
            case "Medium":  
                return <YellowIcon/>
            default:
                return <GreenIcon/>
            
        }
        
    }

    const handleClick = () => {
        if (canClick) {
            setDetailedTask(taskData);
            if (setState) {
                setState(taskData.state);
            }
        }
    }   

    const handleEditClick = (taskId) => {
        history.push('/task/edit/' + taskId)
    }

    return (<div>
            {showTask
            &&
            <TaskContainer onClick={handleClick}>
                <IDContainer>
                    {taskData.id}
                </IDContainer>
                <TaskNameContainer>
                    {taskData.title.length > 20 ? taskData.title.slice(0,20) + "..." : taskData.title}
                </TaskNameContainer>

                <PriorityContainer>
                    {renderIcon()}
                    {taskData.priority ? taskData.priority : "Low"}
                </PriorityContainer>
                <DeadlineContainer>
                    {taskData.due_date ? taskData.due_date.slice(0,10) : "No Deadline"}
                </DeadlineContainer>
                <ToggleButton token={token} taskData={taskData} setState={setState} state={taskData.state} canEdit={canEdit}/>
                {canEdit && <EditButton onClick={() => handleEditClick(taskData.id)}/>}
                {canEdit && <DeleteButton onClick={handleDelete}/>}
            </TaskContainer>}
        </div>
        
    )
}


export default Task

