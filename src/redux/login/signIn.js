import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './auth.Service';
import { setMessage } from './message';

const user = JSON.parse(localStorage.getItem('user'));
export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const data = await AuthService.login(username, password);
    console.log(login.fulfilled);
    return { user: data };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

export const { reducer } = authSlice;
export default reducer;
