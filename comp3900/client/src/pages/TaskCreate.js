import React from 'react'
// Components
import styled from 'styled-components'
import TaskCreateForm from '../components/TaskCreate/TaskCreateForm'

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
 * Task Create page component on route /task/create
 */
const TaskCreate = () => {

    return (
        <MainContainer>
            <TaskCreateForm/>
        </MainContainer>
    )
}

export default TaskCreate
