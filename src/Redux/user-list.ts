import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserListResponse, UserListState } from '../Interfaces/user-list';
import { httpget } from '../Services/remote';
import store from './store';

const initialState = { loading: true, currentPage: 1 } as UserListState;

export const getUserList = createAsyncThunk('user-list/fetch', async (page: number) => {
  const state = store.getState().userList;
  // In this case i already have all the data i need.
  if (state.data && state.data.length === state.total) {
    return null;
  }
  const fetchResult = await httpget(`users${page ? `?page=${page}` : ''}`);
  const result = (await fetchResult?.json()) as UserListResponse;
  if (fetchResult?.ok) {
    return result;
  }
  throw new Error('Fetch error');
});

const UserListSlice = createSlice({
  initialState,
  name: 'user-list',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetUserList: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserList.rejected, () => initialState);
    builder.addCase(getUserList.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.loading = false;
        state.total = action.payload.total;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.page;
        state.data = action.payload.page === 1 ? action.payload.data : state.data?.concat(action.payload.data);
      }
    });
  },
});

export const { setCurrentPage, resetUserList } = UserListSlice.actions;

export default UserListSlice.reducer;
