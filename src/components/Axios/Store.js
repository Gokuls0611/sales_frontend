// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer,{ setAuthState } from './AuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const savedAuthState = localStorage.getItem('authState');
if (savedAuthState) {
  store.dispatch(setAuthState(JSON.parse(savedAuthState)));
}


export default store;
