import {useState} from 'react'
import { editTask } from '../../api/task'
import styled from 'styled-components'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useEffect } from 'react'
const ToggleTaskButton = styled.button`
width: 75px;
height: 30px;
background-color: #007ABE;
color: white;
display: flex;
flex-direction: row;
align-items: center;

border-radius: 6px;
border: none;
flex-direction; flex-end;
cursor: ${props => props.canEdit ? "pointer" : ""}

`
//justify-content: center;
const ToggleContainer = styled.div`
    display: flex;
    position: relative;
    padding-left: 0.5rem;
    padding-right: ${props => (props.canEdit || props.onProfile ? '0rem' : '3rem')}
`
//
const DropdownContainer = styled.div`
    position: absolute;
    z-index: 3;
    width: 120px;
    background-color: white;
    top: 35px;
    right: 0px;
    border-bottom-left-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
`

const DropdownButton = styled.button`
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

const ButtonContent = styled.div`
    display: flex;
    width: 63.95;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const Arrow = styled(IoMdArrowDropdown)`
    padding-left:0.2rem;
`

const ButtonText = styled.div`
    display: flex;
    width: ${props => (props.canEdit ? '45px' : '63.95px')};
    align-items: center;
    justify-content: center;
`

/**
 * The toggle button used by the task component
 * @param {*} token - Current token
 * @param {*} taskData - Task Data
 * @param {*} state - The current state of the task
 * @param {*} setState - useState function to set the state of the task
 * @param {*} canEdit - boolean to show whether a user can edit this task
 * @param {*} onProfile - boolean to show whether this component is on a profile
 */
function ToggleButton({token, taskData, setState, state, canEdit, onProfile}) {
    const getState = (state) => {
        var returnVal = ""
        if (state==="IP") {
            returnVal = "Doing";
        } else if (state==="C") {
            returnVal = "Done";
        } else if (state==='B') {
            returnVal = "Blocked";
        } else {
            returnVal = "To-Do";
        }
        return returnVal;
    }

    const [taskState, setTaskState] = useState(getState(taskData.state));
    const [showDropdown, setDropDown] = useState(false);

    useEffect(() => {
        setTaskState(getState(state))
    }, [state])

    const handleDropClick = (newState) => {
        editTask(token, taskData, newState);
        setTaskState(getState(taskData.state));
        setDropDown(!showDropdown)
        if (setState) {
            setState(newState)
        }
    }
    const Dropdown = () => {

        return (
            <DropdownContainer>
                <DropdownButton onClick={() => handleDropClick("NS")}>To-Do</DropdownButton>
                <DropdownButton onClick={() => handleDropClick("B")}>Blocked</DropdownButton>
                <DropdownButton onClick={() => handleDropClick("IP")}>Doing</DropdownButton>
                <DropdownButton onClick={() => handleDropClick("C")}>Done</DropdownButton>
            </DropdownContainer>
        )
    }
        return (<ToggleContainer canEdit={canEdit} onProfile={onProfile}>
                    <ToggleTaskButton onClick={() => setDropDown(!showDropdown)} canEdit={canEdit}>
                        <ButtonContent> <ButtonText canEdit={canEdit}>{taskState}</ButtonText>{canEdit && <Arrow/>} </ButtonContent>                    
                    </ToggleTaskButton>                
                    {
                        showDropdown
                        &&
                        canEdit
                        &&
                        <Dropdown/>
                    }
                </ToggleContainer>)
}

export default ToggleButton

