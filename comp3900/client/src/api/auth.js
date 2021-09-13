import axios from "axios"

/**
 * Registers a user 
 */
export const registerUser = async (first_name, last_name, email, username, password) => {
    return axios.post('/auth/signup/',
    {
        first_name,
        last_name,
        email,
        username,
        password
    })
    
}

/**
 * Logs in a user given a username and password
 * @returns Authentication token in response.data
 */
export const loginUser = async (username, password) => {
    return axios.post('/auth/login',
    {
        username,
        password
    })
}

/**
 * Sends a password reset email
 * @param {*} email - If email exists, an email will be sent
 */
export const sendResetPasswordEmail = async (email) => {
    return axios.post('/auth/password_reset',
    {
        email
    })
}

/**
 * Changes a user's password
 * @param {*} token - Authentication token of user
 * @param {*} password - The new password to be changed
 * @returns 
 */
export const changeUserPassword = async(token, password) => {
    return axios.post(`/auth/password_resetconfirm/token=${token}`, {
        password,
        token
    })
}