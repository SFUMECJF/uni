import axios from "axios"

/**
 * Retrieves task data given a its ID
 * @param {*} token - Authentication token of the user
 * @param {*} taskId - ID of the user
 * @returns Task data
 */
export const getTasksFromId = async (token, id) => {
    return axios.get('/tasks?assigned_to='+ id,
    {        
        
        headers: {
        Authorization: 'Token ' + token
    }
    })  
}

/**
 * Deletes a task from the id
 * @param {*} token - Authentication token of the user
 * @param {*} taskId - ID of the task
 */
export const deleteTask = async (token, id) => {
    return axios.delete('/task/' + id + '/',
    {
        headers: {
            Authorization: 'Token ' + token
        }
    })
}

/**
 * Edits task details
 * @param {*} token - Authentication token of the user
 * @param {*} task - Task Data
 * @param {*} newState - The new State to change the task to
 */

export const editTask = async (token, task, newState) => {
    task.state = newState;
    if (newState === "C") {
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
        task.completed_date = currentDate + "T00:00:00Z";
    }   
    return axios.put('/task/' + task.id + '/',
        task,
        {
            headers: {
                Authorization: 'Token ' + token
            }
        }
    )
}

//Gets all tasks in the system
export const getAllTasks = async() => {
    return axios.get('/task/',
    {
    })
}

/**
 * Retrieves task data from a search query
 * @param {*} token - Authentication token of the user
 * @param {*} taskQuery - Query Object defining fields to search by
 * @param {*} id - Id of user
 * @returns Task data
 */
export const getTasksFromQuery = async (token, taskQuery, id) => {
    var query_string = "";
    if (taskQuery.id) {
        query_string += "id=" + taskQuery.id + "&";
    }
    if (taskQuery.title) {
        query_string += "title=" + taskQuery.title + "&";
    }
    if (taskQuery.summary) {
        query_string += "summary=" + taskQuery.summary + "&";
    }
    if (taskQuery.deadline) {
        query_string += "deadline=" + taskQuery.deadline + "&";
    }
    if (taskQuery.assigned_to) {
        query_string += "assigned_to=" + taskQuery.assigned_to;
    } else {
        query_string += "assigned_to=" + id;
    }

    return axios.get('/tasks?' + query_string, 
    {},
    {
        headers: {
            Authorization: 'Token ' + token
        }
    })
}