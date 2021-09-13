import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import Task from '../Task/Task'
import { getUserDetailsToken } from '../../api/profile';
import { getTasksFromId, getTasksFromQuery } from '../../api/task';
import TaskDetailDisplay from './TaskDetailDisplay';
import TaskHeader from '../Task/TaskHeader';

const MainDisplayContainer = styled.div`
    display: flex;
    allign-items: center;
    justify-content: flex-end;
    border-radius: 10px;
    height: 685px
`
const TaskDisplayContainer = styled.div`
    display: flex;
    allign-items: center;
    width: 640px;
    height: 600px;
    flex-direction: column;
    padding-right: 2rem;
    padding-left: 0rem;
    overflow-y: auto;
`

const Instruction = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    padding-top: 10px;

`

/**
 * Task Display on the Main Page
 * @param {*} token - Current token
 * @param {*} searchQuery - Current search query used to filter tasks
 * @param {*} setTaskStats - useState function used to pass the statics of the task rendered in this component
 */
const TaskDisplay = ({ token, searchQuery, setTaskStats}) => {
    const [tasks, setTasks] = React.useState(false)
    const [apiLoaded, setApiLoaded] = React.useState(false)
    const [detailedTask, setDetailedTask] = React.useState(undefined);
    const [state, setState] = React.useState(undefined);
    const [userId, setUserId] = React.useState(-1);
    useEffect(() => {
        getUserDetailsToken(token).then(data => {
            const id = data.data[0]["id"];
            setUserId(id);
            if (searchQuery) {
                getTasksFromQuery(token, searchQuery, id).then(taskData => {
                    setTasks(taskData.data);

                }).then(() => setApiLoaded(true))
            } else {
                getTasksFromId(token, id).then(taskData => {
                    setTasks(taskData.data);
                }).then(() => setApiLoaded(true))
            }
        })


    // eslint-disable-next-line
      }, [searchQuery]);

    useEffect(() => {
        if (tasks) {
            var currentDateObject = new Date();
            const month = currentDateObject.getMonth() + 1;
            var extra0month = "";
            if (month < 10) {
                extra0month = "0"
            }

            const date = currentDateObject.getDate();
            var extra0day = ""
            if (date < 10) {
                extra0day  = "0";
            }
            var currentDate = currentDateObject.getFullYear() + "-" + extra0month + month + "-"  + extra0day + date;
            var dueToday = 0;
            for (var i = 0; i < tasks.length; i++) {
                const due_date_raw = tasks[i]["due_date"]
                    if (due_date_raw) {
                    const task_due_date = due_date_raw.substr(0, due_date_raw.indexOf('T'));
                    if (task_due_date === currentDate) {
                        dueToday += 1;
                    }
                }
            }
            const total = tasks.length;
            setTaskStats({dueToday, total})
        }
    // eslint-disable-next-line
    }, [tasks])


      const renderTasks = () => {
        if(tasks === undefined) {
            return (<TaskDisplayContainer/>);
        } else {
            tasks.sort(function(a,b){
                if (a.due_date === null) {
                    return 1;
                }
                else if (b.due_date === null) {
                    return -1;
                } else {
                    return new Date(a.due_date) - new Date(b.due_date);
                }
            });
            const TaskItems = tasks.map((t) => <Task token={token} taskData={t} setDetailedTask={setDetailedTask} setState={setState} canClick={true} canEdit={t.assigned_to === userId || t.created_by === userId}/>);
            return (<div>
                <TaskHeader isMain={true}/>
                <TaskDisplayContainer>
                {tasks.length === 0 ? searchQuery ? <Instruction> No Tasks Found </Instruction> : <Instruction> Created Tasks will be Shown Here </Instruction>: TaskItems }
                </TaskDisplayContainer>
                </div>
            );
        }
    }
    return (
        <>
            <MainDisplayContainer>
                {apiLoaded ? renderTasks() : <TaskDisplayContainer/>}  
                <TaskDetailDisplay token={token} taskData={detailedTask} state={state} setState={setState} canEdit={false}/>
            </MainDisplayContainer>
        </>
    )
}

export default TaskDisplay