import React, { useEffect , useState} from 'react';
import styled from 'styled-components';
import { getUserDetailsId } from '../../api/profile';
import SimpleRating from './Rating';
import { useSelector } from 'react-redux';
import { idSelector } from '../../redux/features/userSlice';
import { BiSmile } from 'react-icons/bi';

const TaskSliderContainer = styled.div`
    height: 685px;
    background-color: #4B4B4B;
    width: 200px;
    border-radius: 10px;
    padding-top: 1rem;
    box-sizing: border-box;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;

`

const YourTasksButton = styled.span`
    color: white;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SliderTitle = styled.span`
    color: white;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size : 20px;
`
const QuestionDiv = styled.div`
    color: white;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-end;

`

const WeekDiv = styled.div`
    color: white;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
`

const BusynessField = styled.div`
    color: white;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 0rem;
    align-items: flex-end;
`

const BusynessReply = styled.div`
    color: white;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0rem;
`

const ThanksContainer1 = styled.div`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0rem;
    padding-top: 55px;

`

const ThanksContainer2 = styled.div`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0rem;
    padding-left: 15px;
`

const Smiley = styled(BiSmile)`
    padding-left: 0.2rem;
    width: 20px;
`

/**
 * Task bar to the left of the main page showing the task stats and the feedback form
 * @param {*} token - Current token
 * @param {*} taskStats - taskStats props
 */
const TaskSlider = ({token, taskStats }) => {
    const [showForm, setShowForm] = useState(false);
    const [userDetails, setUserDetails] = useState(undefined);
    const [busyness, setBusyness] = useState(undefined);
    const [showThanks, setShowThanks] = useState(false);
    const id = useSelector(idSelector)

    useEffect(() => {
        if (id) {
                getUserDetailsId(token, id).then(data => {
                setUserDetails(data.data);
                setShowForm(data.data["busyness_can_reply"])
                setBusyness(labels[data.data.busyness])
                
            })
        }
    // eslint-disable-next-line
    }, [id])

    const labels = {
        1: '0%',
        2: '25%',
        3: '50%',
        4: '75%',
        5: '100%',
        6: '100+%',
      };




    return (
        <TaskSliderContainer>
            <SliderTitle>
                Your Tasks
            </SliderTitle>
            <YourTasksButton>
                Total Tasks: {taskStats ? taskStats.total : ""}
            </YourTasksButton>
            <YourTasksButton>
                Due Today: {taskStats ? taskStats.dueToday : ""}
            </YourTasksButton>
            <BusynessField>
                Busyness Estimate
            </BusynessField>
            <BusynessReply>
                {busyness ? busyness : ""}
            </BusynessReply>
            {showThanks && <div><ThanksContainer1>Thanks for your</ThanksContainer1><ThanksContainer2>Feedback<Smiley/></ThanksContainer2></div>}
            {showForm && <div>
            <QuestionDiv>
                How busy was your
            </QuestionDiv>  
            <WeekDiv>
                week?
            </WeekDiv>          
            <SimpleRating setShowForm={setShowForm} userDetails={userDetails} token={token} setBusyness={setBusyness} setShowThanks={setShowThanks}/>
            </div>}
        </TaskSliderContainer>
    )
}

export default TaskSlider
