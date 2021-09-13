import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFriendRequests, getFriends } from "../../api/connections";
import { getMessages } from "../../api/messages";

// Async Thunks

/**
 * Retrieves all the user's connections.
 */
export const fetchConnections = createAsyncThunk(
    'users/fetchFriends',
    async ({ token, onlineFriends }) => {
        const response = await getFriends(token);
        let currFriends = response.data;

        // Determines the users that are currently online
        currFriends = currFriends.map((friend) => {
            friend.online = false;
            for (let i = 0; i < onlineFriends.length; i++) {
                if (onlineFriends[i].username === friend.username) {
                    friend.online = true;
                    friend.socketId = onlineFriends[i].userID
                }
            }
            return friend;
        })

        return currFriends;
    }
)

/**
 * Retrieves all the user's messages
 */
export const fetchMessages = createAsyncThunk(
    'users/fetchMessages', 
    async ({ token, sender, receiver }) => {
        const response = await getMessages(token, sender, receiver);
        return response.data;
    }
)

/**
 * Retrieves all the user's messages
 */
export const fetchConnectionRequests = createAsyncThunk(
    'users/fetchConnectionRequests',
    async (token) => {
        const response = await getFriendRequests(token);
        return response.data;
    }
)

/**
 * Main slice of the friendsReducer
 */
export const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        connections: [],
        requests: [],
        selectedFriend: 0,
        stateLoaded: false,
        stateRequestsLoaded: false,
        stateMessagesLoaded: false,
        onlineFriends: [],
        messages: []
    },
    reducers: {
        // Removes the currently selected friend
        removeFriend: (state, action) => {
            state.connections.splice(state.selectedFriend, 1);
            state.selectedFriend = 0;
        },
        // Removes the friend given a username
        removeFriendByUsername: (state, action) => {
            if (action.payload.username) {
                for (let i = 0; i < state.requests.length; i++) {
                    if (state.requests[i].username === action.payload.username) {
                        state.requests.splice(i, 1);
                    }
                } 
            }
        },
        // Accepts a friend request given an index
        approveRequest: (state, action) => {
            const index = action.payload.index;
            const request = state.requests[index];
            state.connections.push(request);
            state.requests.splice(index, 1);
        },
        // Removes a friend request given an index
        removeRequest: (state, action) => {
            const index = action.payload.index;
            state.requests.splice(index, 1);
        },
        // Changes the currently selected friend given an index
        selectFriend: (state, action) => {
            const index = action.payload.index;
            state.selectedFriend = index;
            state.messages = [];
        },
        // Sets friends of user
        setConnections: (state, action) => {
            state.connections = action.payload.friends;
        },
        // Sets friend requests of user
        setRequests: (state, action) => {
            state.requests = action.payload.requests;
        },
        // Adds a message if it is private
        addPrivateMessage: (state, action) => {
            const { from, content } = action.payload;

            const friend = state.connections[state.selectedFriend]

            if (friend.online && friend.socketId === from) {
                state.messages.push(content);
            }
        },
        // Adds a message to the list of messages
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchConnections.fulfilled, (state, action) => {
            const connectionList = action.payload.map(({ 
                first_name, last_name, username, id, online, socketId 
            }) => ({
                name: `${first_name} ${last_name}`,
                id,
                username,
                online,
                socketId
            }));
            state.connections = connectionList;
            state.stateLoaded = true;
        })
        .addCase(fetchConnectionRequests.fulfilled, (state, action) => {
            state.requests = action.payload.map(({ first_name, last_name, username, id, online }) => ({
                name: `${first_name} ${last_name}`,
                id,
                username,
                online
            }));
            state.stateRequestsLoaded = true;
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.stateMessagesLoaded = true;
        })
    }
})

// Selectors

/**
 * 
 * @param {*} friends 
 * @returns Currently selected friend
 */
export const currentFriendSelector = ({ friends }) => {
    if (friends.connections.length <= 0) {
        return null;
    } 
    const friend = friends.connections[friends.selectedFriend]

    if (friend) return friend;

    return null;
}

/**
 * 
 * @param {*} state 
 * @returns Boolean - If the async request for friends has been fulfilled
 */
export const friendsLoadedSelector = (state) => state.friends.stateLoaded && state.friends.stateRequestsLoaded;

/**
 * 
 * @param {*} state 
 * @returns All of the connections the user has
 */
export const friendsSelector = (state) => state.friends.connections;

/**
 * 
 * @param {*} state 
 * @returns Boolean - If async messages request has been fulfilled
 */
export const messagesLoadedSelector = (state) => state.friends.stateMessagesLoaded

/**
 * 
 * @param {*} state 
 * @returns All the messages of the user and the currently selected friend
 */
export const messagesSelector = (state) => state.friends.messages;

/**
 * 
 * @param {*} state 
 * @returns Current messages count in state.messages
 */
 export const messagesCounterSelector = (state) => state.friends.messages.length;

export const {
    removeFriend,
    removeRequest,
    approveRequest,
    selectFriend,
    setConnections,
    setRequests,
    removeFriendByUsername,
    addMessage,
    addOnlineFriend,
    addPrivateMessage
} = friendsSlice.actions;

export default friendsSlice.reducer;