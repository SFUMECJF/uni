import axios from "axios"

/**
 * Finds a user given their email
 * @param {*} token - Authentication token of user
 * @param {*} email - Email of the user to be searched
 * @returns 
 */
export const searchUserEmail = async (token, email) => {
    return axios.get('/users?email=' + email,
    {
        token,
        email
    }, {
        headers: {
            Authorization: 'Token ' + token,
        }
    })  
}

/**
 * Gets the details of another user given their username
 * @param {*} token - Authentication token of user
 * @param {*} username - Username of the user to retrieve their details
 * @returns 
 */
export const getUserDetails = async (token, username) => {
    return axios.get('/users?username='+ username,
    {
        token,
        username
    }, {
        headers: {
            Authorization: 'Token ' + token,
        }
    })  
}

/**
 * Gets the details of the current user
 * @param {*} token - Authentication token of the current user
 * @returns 
 */
export const getUserDetailsToken = async (token) => {
    return axios.get('/users?token='+ token,
    {
        token,
    }, {
        headers: {
            Authorization: 'Token ' + token,
        }
    })  
}

export const getUserDetailsId = async (token, id) => {
    return axios.get('/user/' + id,
    {
    }, {
    headers: {
        Authorization: 'Token ' + token,
    }
    })   
}
export const userUpdateDetails = async (token, id, first_name, last_name, profile_picture, company, currentUsername, email, isPrivate) => {
    const username = currentUsername;
    return axios.put('/user/' + id.toString() + '/',
    {
        token,
        first_name,
        last_name,
        profile_picture,
        company,
        username,
        email,
        isPrivate
    }, {
        headers: {
            Authorization: 'Token ' + token,
        }
    })  
}

export const updateBusyness = async (token, userDetails, feedback) => {
    userDetails.busyness_can_reply = false;
    userDetails.busyness_response = feedback
    return axios.put('/user/' + userDetails.id.toString() + "/", userDetails, 
    {
        headers: {
            Authorization: 'Token ' + token,
        }        
    })
}

export const changePrivacy = async (token, isPrivate) => {
    return axios.post('/user/updatePrivacy',
    {
        token,
        isPrivate
    }, {
        headers: {
            Authorization: 'Token ' + token,
        }
    })
}

export const addFriend = async(token, username) => {
    return axios.post('/sentfriendrequests/?username=' + username, 
    {

    },
    {
        headers: {
            Authorization:`Token ${token}`
        }
    })
}

export const cancelFriendRequest = async(token, username) => {
    return axios.delete('/sentfriendrequests/?username=' + username, 
    {
        headers: {
            Authorization:`Token ${token}`
        }
    })
}

export const getSentRequests = async (token) => {
    return axios.get('/sentfriendrequests/',
    {
        headers: {
            Authorization:`Token ${token}`
        }
    })
}

export const getFriendRequests = async (token) => {
    return axios.get('/receivedfriendrequests/',
    {
        headers: {
            Authorization:`Token ${token}`
        }
    })
}


export const getFriends = async (token) => {
    return axios.get('/friends/',
    {
        headers: {
            Authorization:`Token ${token}`
        }
    })
}



