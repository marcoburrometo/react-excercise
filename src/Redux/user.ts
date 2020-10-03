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
    const authResult = await httppost('/login', { email, password });
    // In a real case scenario i'm expecting a 403 error.
    if (authResult?.ok) {
      const result = await authResult.json();
      return {
        accessToken: result.token,
        error: result.error,
      } as UserState;
    }
    return {
      error: 'Unknown error',
    } as UserState;
  },
);

const UserSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    removeError: (state) => {
      state.error = undefined;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Unknown error';
    });
    builder.addCase(login.fulfilled, (state, action) => ({
      ...action.payload,
      loading: false,
      error: undefined,
    }));
  },
});

export const { logout, removeError } = UserSlice.actions;

export default UserSlice.reducer;
