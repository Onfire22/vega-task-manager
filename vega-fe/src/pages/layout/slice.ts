import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState } from './types.ts';

export const initialState: IInitialState = {
	isSidebarOpened: false,
	searchValue: '',
};

const tasksSlice = createSlice({
	name: '@@layout',
	initialState,
	reducers: {
		setIsSidebarOpened: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpened = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
	},
});

export const { setIsSidebarOpened, setSearchValue } = tasksSlice.actions;
export default tasksSlice.reducer;
