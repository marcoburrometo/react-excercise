import { RootState } from '../store';

export const themeSelector = (state: RootState) => state.ui.theme;
