import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, IUserModalInfo } from '@/pages/project-page/types.ts';

export const initialState: IInitialState = {
	modalInfo: null,
};

const projectSlice = createSlice({
	name: '@@project',
	initialState,
	reducers: {
		setModalInfo: (state, action: PayloadAction<IUserModalInfo | null>) => {
			state.modalInfo = action.payload;
		},
	},
});

export default projectSlice.reducer;
export const { setModalInfo } = projectSlice.actions;
