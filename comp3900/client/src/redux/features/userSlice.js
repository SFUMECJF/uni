import { createSlice } from '@reduxjs/toolkit'

/**
 * Main slice of the userReducer
 */
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: window.localStorage.getItem('token'),
        username: window.localStorage.getItem('username'),
        profilePicture: window.localStorage.getItem('profilePicture'),
        id: window.localStorage.getItem('id'),
        socketId: null,
        socket: null,
    },
    reducers: {
        // Logs in the user
        login: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.profilePicture = action.payload.profilePicture;
            state.id = action.payload.id;
        },
        // Logs out the user
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.profilePicture = null;
            state.id = null;
            state.socketId = null;
            state.socket.disconnect();
            state.socket = null;
        },
        // Sets the user's profile picture
        setProfilePicture: (state, action) => {
            const picture = action.payload.picture;
            window.localStorage.setItem('profilePicture', picture);
            state.profilePicture = picture;
        },
        // Sets the socket of the user
        setSocket: (state, action) => {
            const id = action.payload.socketId;
            state.socketId = id;
            state.socket = action.payload.socket;
        }
    }
})

// Selectors

/**
 * 
 * @param {*} state 
 * @returns The token of the user
 */
export const tokenSelector = (state) => state.user.token;

/**
 * 
 * @param {*} state 
 * @returns The profile picture of the user
 */
export const profilePictureSelector = (state) => state.user.profilePicture;

/**
 *  
 * @returns The whole user object
 */
export const userDetailsSelector = ({ user }) => {
    return user;
}

/**
 * 
 * @param {*} state 
 * @returns The username of the user
 */
export const usernameSelector = (state) => state.user.username;

export const idSelector = (state) => state.user.id;

export const socketSelector = (state) => state.user.socket;

export const { login, logout, setProfilePicture, setSocket } = userSlice.actions;
export default userSlice.reducer;