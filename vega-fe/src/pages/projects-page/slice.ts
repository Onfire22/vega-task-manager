import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	pagination: {
		pageLimit: 15,
		page: 1,
	},
};

const projectsSlice = createSlice({
	name: '@@projects',
	initialState,
	reducers: {
		setPagination: (state, action) => {
			state.pagination = action.payload;
		},
	},
});

export default projectsSlice.reducer;
export const { setPagination } = projectsSlice.actions;
