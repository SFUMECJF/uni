import { useEffect, useState } from 'react';
import styled from "styled-components"
import { IoMdRadioButtonOn } from 'react-icons/io';
import { getUserDetailsId } from '../../api/profile';
import ToggleButton from '../Task/ToggleButton';
import default_pic from './pic.png'

const DetailDisplayContainer = styled.div`
    display: flex;
    allign-items: center;
    width: 650px;
    height: 250px;
    margin-left: 2.7rem;
    padding-top: 1rem;
`
const ContentDisplayContainer = styled.div`
    display: flex;
    allign-items: center;
    width: 600px;   
    height: 230px;
    border-radius: 15px;
    background-color: white;
`

const FirstContainer = styled.div`
    display: flex;
    allign-items: center;
    width: 280px;
    height: 230px;
    background-color: white;
    border-radius: 15px;
    flex-direction: column;
    overflow-y: auto;
    align-items: flex-start
    margin-right: 1rem;
`

const SecondContainer = styled.div`
    display: flex;
    allign-items: center;
    width: 120px;
    height: 230px;
    background-color: white;
    border-radius: 15px;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 1rem;
`

const ThirdContainer = styled.div`
    display: flex;
    allign-items: center;
    width: 200px;
    height: 230px;
    background-color: white;
    border-radius: 15px;
    flex-direction: column;
    align-items: flex-start
    margin-right: 1rem;
`

const RedIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: red;
    padding-right: 0.3rem;
    padding-left: 5rem;
`

const YellowIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: #C57600;
    padding-right: 0.3rem;
    padding-left: 5rem;
`

const GreenIcon = styled(IoMdRadioButtonOn)`
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    color: green;
    padding-right: 0.3rem;
    padding-left: 5rem;
`

const IDContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding-left: 1rem;
    height: 30px;
    width: 150px;
    padding-top: 1rem;
    color: #AAAAAA;
    font-weight: bold;
    font-size: 13px
`

const TitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 150px;
    padding-left: 1rem;
    white-space: initial;
    font-weight: bold;
    font-size: 150%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    font-size: 20px
`
const SummaryContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 150px;
    padding-top: 0.5rem;
    flex-direction: column;
    padding-left: 0.5rem;
`

const Text = styled.div`
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    word-wrap: break-word;
    font-size: 14px;
`

const StoryText = styled.div`
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    word-wrap: break-word;
    display: flex;
    align-item: flex-end;
    font-size: 14px;
`

const Name = styled.div`
padding-left: 0.5rem;
padding-bottom: 0.5rem;
word-wrap: break-word;
font-size: 15px;

`
const BoldText = styled.div`
    font-weight: bold;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    font-size: 13px
`

const ProgressContainer = styled.div`
    display: flex;
    align-items: flex-start;
    height: 70px;
    width: 150px;
    padding-top: 0.5rem;
    flex-direction: column;
    padding-left: 0.5rem;
`

const DeadlineContainer = styled.div`
    display: flex;
    align-items: flex-end;
    padding-top: 0.5rem;
    flex-direction: column;
    padding-left: 0.5rem;
    padding-bottom: 10px;
`

const PriorityContainer = styled.div`
    display: flex;
    align-items: flex-start;
    height: 30px;
    width: 150px;
    padding-top: 0.5rem;
    flex-direction: row;
    padding-left: 1rem;
    align-content: center;
    padding-bottom: 4px;
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
    align-items: flex-end;
    width: 100px;
    padding-top: 1rem;
    flex-direction: column;
    padding-left: 0.5rem;
`

const StoryTitle = styled.div`
    display: flex;
    font-weight: bold;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 13px;
    align-items: flex-end;
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
    height: 45px;
    width: 150px;
    padding-top: 0.5rem;
    flex-direction: row;
    padding-left: 1rem;
    align-content: center;
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
    font-weight: bold;
    padding-left: 120px;
`


/**
 * Component for the profile that shows the details of the selected task
 * @param {*} token - token of the user
 * @param {*} taskData - Current task data to show
 * @param {*} state - Current state of the task
 * @param {*} setState - useState function for the state prop.
 * 
 */
const TaskDetailProfile = ({token, taskData, state ,setState }) => {
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

    if (!taskData) {
        return (<DetailDisplayContainer>
        <ContentDisplayContainer>
            <Instruction1>Click on a Task to Expand the Details Here</Instruction1>
        </ContentDisplayContainer>
    </DetailDisplayContainer>)
    }

    return(<DetailDisplayContainer>
                <ContentDisplayContainer>
                    <FirstContainer>
                        <IDContainer>
                            {"ID-" + taskData.id}
                        </IDContainer>
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
                    </FirstContainer>
                    <SecondContainer>

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
                                Story Points
                            </StoryTitle>
                            <StoryText>
                                {taskData.story_points ? taskData.story_points : "Not Provided"}
                            </StoryText>
                        </StoryContainer>
                    </SecondContainer>
                    <ThirdContainer>
                    <ProgressContainer>
                        <BoldText>
                            Progress
                        </BoldText>
                        <ToggleButton taskData={taskData} state={state} setState={setState} showArrow={false} onProfile={true} />
                    </ProgressContainer>
                    <AssignTitle>
                        Assigned By
                    </AssignTitle>
                    <AssignContainer>
                        <Icon src={(assigner !== undefined && assigner.profile_picture !== '') ? assigner.profile_picture : default_pic}/>
                        <Name>
                            {assigner !== undefined ? assigner.first_name + " " + assigner.last_name : null}
                        </Name>
                    </AssignContainer>
                    <AssignTitle>
                        Assigned To
                    </AssignTitle>
                    <AssignContainer>
                        <Icon src={(assignee !== undefined && assignee.profile_picture !== '') ? assignee.profile_picture : default_pic}/>
                        <Name>
                            {assignee !== undefined ? assignee.first_name + " " + assignee.last_name : null} 
                        </Name>
                    </AssignContainer>
                    </ThirdContainer>
                    
                </ContentDisplayContainer>
            </DetailDisplayContainer>)
}

export default TaskDetailProfile