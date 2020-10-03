import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserState } from '../Interfaces/user';
import { httppost } from '../Services/remote';

const initialState = { user: undefined, error: undefined, loading: false } as UserState;

/**
 * Authenticates the user using email + password
 */
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const authResult = await httppost('login', { email, password }, true);
    const result = await authResult?.json();
    if (authResult?.ok) {
      return {
        user: { email },
        accessToken: result.token,
        error: result.error,
      } as UserState;
    }
    return {
      error: result.error || 'Unknown error',
    } as UserState;
  },
);

const UserSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    removeError: (state) => {
      state.error = undefined;
      state.loading = false;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.accessToken = undefined;
      state.loading = false;
      state.error = 'Unknown error';
    });
    builder.addCase(login.fulfilled, (state, action) => ({
      ...action.payload,
      loading: false,
    }));
  },
});

export const { logout, removeError } = UserSlice.actions;

export default UserSlice.reducer;
