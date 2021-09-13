import styled from 'styled-components';
import ToggleButton from '../Task/ToggleButton';
import { IoMdRadioButtonOn } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { getUserDetailsId } from '../../api/profile';
import default_pic from '../Profile/pic.png'

const DetailContainer  = styled.div`
    display: flex;
    width: 285px;
    background-color: white;
    border-radius: 10px;
    height: 685px;
    box-shadow: 1px -1px 44px -8px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    margin-left: 10px;
`

const IdContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding-left: 1rem;
    height: 25px;
    width: 310px;
    padding-top: 1rem;
    color: #AAAAAA;
    font-weight: bold;
    font-size: 13px
`
const TitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 290px;
    padding-left: 1rem;
    white-space: initial;
    font-weight: bold;
    font-size: 150%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: 20px
`



const ProgressContainer = styled.div`
    display: flex;
    align-items: flex-start;
    height: 70px;
    width: 310px;
    padding-top: 0.5rem;
    flex-direction: column;
    padding-left: 0.5rem;
`
const Text = styled.div`
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 13px;
    width: 250px;
    word-wrap: break-word;

`
const BoldText = styled.div`
    font-weight: bold;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    font-size: 13px;
    width: 250px;
`


const SummaryContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 310px;
    padding-top: 0.5rem;
    flex-direction: column;
    padding-left: 0.5rem;
`

const DeadlineContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 310px;
    padding-top: 1rem;
    flex-direction: column;
    padding-left: 0.5rem;
`

const PriorityContainer = styled.div`
    display: flex;
    align-items: flex-start;
    height: 30px;
    width: 310px;
    padding-top: 0.5rem;
    flex-direction: row;
    padding-left: 1rem;
    align-content: center;
`

const PriorityTitle = styled.div`
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    font-size: 13px
`

const StoryContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 310px;
    padding-top: 1rem;
    flex-direction: column;
    padding-left: 0.5rem;
`

const StoryTitle = styled.div`
    font-weight: bold;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    font-size: 13px;
    width: 105px
`
const AssignTitle = styled.div`
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    font-size: 13px
`

const AssignContainer = styled.div`
    display: flex;
    align-items: flex-start;
    height: 30px;
    width: 310px;
    padding-top: 0.5rem;
    flex-direction: row;
    padding-left: 1rem;
    align-content: center;
`

const RedIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: red;
    padding-right: 0.3rem;
`

const YellowIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: #C57600;
    padding-right: 0.3rem;
`

const GreenIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: green;
    padding-right: 0.3rem;
`


const Icon = styled.img`
    border-radius: 50%;
    border: solid 2px #A90000;
    width: 30px;
    height: 30px;
`

const Instruction1 = styled.div`
    padding-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`

const Instruction2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`

/**
 * Detailed Display of the task that is currently selected
 * @param {*} token - Current token
 * @param {*} taskData - Task Data of currently selected task
 * @param {*} state - State of the task
 * @param {*} setState - useState function to set the state of the task
 */
const TaskDetailDisplay = ({token, taskData, state ,setState}) => {
    const [assigner, setAssigner] = useState(undefined);
    const [assignee, setAssignee] = useState(undefined);
    useEffect(() => {
        if (taskData) {
            if (taskData.created_by) {
                getUserDetailsId(token, taskData.created_by).then(data => {
                    setAssigner(data.data);
                })
            }
            if (taskData.assigned_to) {
                getUserDetailsId(token, taskData.assigned_to).then(data => {
                    setAssignee(data.data);
                })
            }

        }
    // eslint-disable-next-line    
    }, [taskData])

    useEffect(() => {
    },[assignee])
    
    if (!taskData) {
        return <DetailContainer>
                    <Instruction1>Click on a Task to</Instruction1>
                    <Instruction2>Expand the Details Here</Instruction2>
                </DetailContainer>
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
    return (
        <DetailContainer>
            <IdContainer>
                {"ID-" + taskData.id}
            </IdContainer>
            <TitleContainer>
                {taskData.title}
            </TitleContainer>
            <SummaryContainer>
                <BoldText>
                    Summary
                </BoldText>
                <Text>
                    {taskData.summary ? taskData.summary : "Not Specified"}
                </Text>
            </SummaryContainer>


            <DeadlineContainer>
                <BoldText>
                    Deadline
                </BoldText>
                <Text>
                    {taskData.due_date ? taskData.due_date.slice(0,10) : "No Deadline"}
                </Text>
            </DeadlineContainer>
            <PriorityTitle>
                Priority
            </PriorityTitle>            
            <PriorityContainer>
                
                {renderIcon()}
                <Text>
                    {taskData.priority ? taskData.priority : "Low"}
                </Text>
            </PriorityContainer>
            <StoryContainer>
                <StoryTitle>
                    Story Points:
                </StoryTitle>
                <Text>
                    {taskData.story_points ? taskData.story_points : "Not Provided"}
                </Text>
            </StoryContainer>
            <ProgressContainer>
                <BoldText>
                    Progress
                </BoldText>
                <ToggleButton taskData={taskData} state={state} setState={setState} showArrow={false}/>
            </ProgressContainer>
            <AssignTitle>
                Assigned By
            </AssignTitle>
            <AssignContainer>
                <Icon src={(assigner !== undefined && assigner.profile_picture !== '') ? assigner.profile_picture : default_pic}/>
                <Text>{assigner !== undefined ? assigner.first_name + " " + assigner.last_name : null}</Text>
            </AssignContainer>
            <AssignTitle>
                Assigned To
            </AssignTitle>
            <AssignContainer>
                <Icon src={(assignee !== undefined && assignee.profile_picture !== '') ? assignee.profile_picture : default_pic}/>
                <Text>{assignee !== undefined ? assignee.first_name + " " + assignee.last_name : null}</Text>
            </AssignContainer>
        </DetailContainer>  
    )
}

export default TaskDetailDisplay