import React from 'react'
import styled from 'styled-components'

// Styled components
const TaskContainer = styled.div`
    margin-top: 0.5rem;
    width: 650px;
    height: 50px;
    flex-direction: row;
    display: flex;
    align-items: center;
    padding-top: 0rem;
    padding-bottom: 0rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    margin-bottom: 0rem;
    justify-content: center;
    padding-left: 1.5rem;
`

const IDContainer = styled.div`
    display: flex;
    width: 35px;
    height: 50px;
    align-items: center;
    font-weight: bold;
    padding-left: 15px
`

const TaskNameContainer = styled.div`
    display: flex;
    width: 225px;
    height: 50px;
    align-items: center;
    font-weight: bold;
    padding-left: 0.5rem;
`

const PriorityContainer = styled.div`
    display: flex;
    width: 100px;
    height: 50px;
    align-items: center;
    font-weight: bold;
`

const DeadlineContainer = styled.div`
    display: flex;
    width: 95px;
    height: 50px;
    align-items: center;
    font-weight: bold;
`

const ProgressContainer = styled.div`
    display: flex;
    width: 130px;
    height: 50px;
    align-items: center;
    font-weight: bold;
`

/**
 * Header Component for the tasks bar, to label the fields of the task
 */
function TaskHeader() { 
    return (
            <TaskContainer>
                <IDContainer>
                    ID
                </IDContainer>
                <TaskNameContainer>
                    Title
                </TaskNameContainer>
                <PriorityContainer>
                    Priority
                </PriorityContainer>
                <DeadlineContainer>
                    Deadline
                </DeadlineContainer>
                <ProgressContainer>
                    Progress
                </ProgressContainer>
            </TaskContainer>

        
    )
}


export default TaskHeader