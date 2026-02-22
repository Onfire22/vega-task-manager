import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';

export const getIsModalShownSelector = () => (state: RootState) =>
	state.tasksReducer?.isModalShown || initialState.isModalShown;
