import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure the key is 'auth'
  },
});

export default store;
