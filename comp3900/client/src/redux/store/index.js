// Store
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import userReducer from '../features/userSlice';
import friendsReducer from '../features/friendsSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        friends: friendsReducer,
    }, 
})

export default store;