import React from 'react'
// Components
import styled from 'styled-components'
import TaskEditForm from '../components/TaskEdit/TaskEditForm'

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
    margin-top: 4rem;
`
/**
 * Task Edit page component on route /task/edit
 */
const TaskEdit = () => {

    return (
        <MainContainer>
            <TaskEditForm/>
        </MainContainer>
    )
}

export default TaskEdit
