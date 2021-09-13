import axios from "axios"

/**
 * Retrieves a list of connections the token has
 * @param {*} token - Authentication token of user
 * @returns A list of friends associated with token
 */
export const getFriends = async (token) => {
    return axios.get('/friends/',
    {
        headers: {
            Authorization: 'Token ' + token,
        }
    })
}

/**
 * Deletes a friend given their username
 * @param {*} token - Authentication token of the user
 * @param {*} username - Username of friend to be deleted
 */
export const deleteConnection = async (token, username) => {
    return axios.delete('/friends/?username=' + username, {
        headers: {
            Authorization: 'Token ' + token,
        }
    })
}

/**
 * Retrieves a list of friend requests the token has
 * @param {*} token - Authentication token of the user
 * @returns A list of friend requests
 */
export const getFriendRequests = async (token) => {
    return axios.get('/receivedfriendrequests/', {
        headers: {
            Authorization: 'Token ' + token,
        }
    })
}

export const acceptFriendRequest = async (token, username) => {
    return axios.post('/receivedfriendrequests/?username=' + username, {}, {
        headers: {
            Authorization: 'Token ' + token,
        }
    });
}

export const rejectFriendRequest = async (token, username) => {
    return axios.delete('/receivedfriendrequests/?username=' + username, {
        headers: {
            Authorization: 'Token ' + token,
        }
    });
}
