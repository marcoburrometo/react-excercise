import { RootState } from '../store';

export const loggedUserSelector = (state: RootState) => state.user.user;
export const userErrorSelector = (state: RootState) => state.user.error;
export const userLoadingSelector = (state: RootState) => state.user.loading;

