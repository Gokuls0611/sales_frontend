import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role:null,
    email:null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.email = action.payload.email
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.email = null
      localStorage.removeItem('authState');
    },
    setAuthState: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { login, logout,setAuthState } = authSlice.actions;
export default authSlice.reducer;
