import axios from "axios";
/**
 * 
 * @param {*} token - Authentication token of the user
 * @param {*} sender - username of the sender
 * @param {*} receiver - username of the receiver
 * @param {*} message - message content to be sent
 */
export const postMessage = async (token, sender, receiver, message) => {

    const reference_id = [sender, receiver].sort().join();

    return axios.post('/message/', {
        reference_id,
        message_text: message
    }, {
        headers: {
            Authorization: 'Token ' + token
        }
    })

}

/**
 * Gets all the messages between two users
 * @param {*} token - Authentication token of user
 * @param {*} sender - username of the sender
 * @param {*} receiver - username of the receiver
 */
export const getMessages = async (token, sender, receiver) => {

    const reference_id = [sender, receiver].sort().join();

    return axios.get(`/message/?reference_id=${reference_id}`, {
        headers: {
            Authorization: 'Token ' + token
        }
    })
}