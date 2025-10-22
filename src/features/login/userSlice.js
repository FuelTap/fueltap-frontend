import { loadFromLocalStorage } from '@/utils/helpers';
import { createSlice } from '@reduxjs/toolkit';

const storedUser = loadFromLocalStorage('userData');

const initialState = storedUser
  ? {
      ...storedUser,
      isAuthenticated: true,
    }
  : {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    updateTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    clearUserData: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});
console.log(initialState);

export const { setUserData, updateTokens, clearUserData } = userSlice.actions;

export default userSlice.reducer;
