import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';

export const getIsModalShownSelector = () => (state: RootState) =>
	state.taskSlice?.isModalShown || initialState.isModalShown;
