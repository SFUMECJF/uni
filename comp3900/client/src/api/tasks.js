import axios from "axios"

/**
 * Creates a task
 * @param {*} token - Authentication token of user 
 * @param {*} data - Data of the task to be created
 */
export const createTask = async (token, data) => {

    return axios.post('/task/', data, {
        headers: {
            Authorization: 'Token ' + token
        }
    })
}

/**
 * Retrieves task data given a its ID
 * @param {*} token - Authentication token of the user
 * @param {*} taskId - ID of the task
 * @returns Task data
 */
export const getTask = async(token, taskId) => {
    return axios.get('/task/' + taskId, {
        headers: {
            Authorization: 'Token ' + token
        }
    })
}

/**
 * Edits a task given its ID
 * @param {*} token - Authentication token of user
 * @param {*} data - Task data to be changed
 * @param {*} taskId - ID of task
 */
export const editTask = async (token, data, taskId) => {

    return axios.put('/task/' + taskId + '/', data, {
        headers: {
            Authorization: 'Token ' + token
        }
    })
}