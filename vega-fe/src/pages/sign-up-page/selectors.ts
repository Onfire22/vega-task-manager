import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';

export const getActiveFormSelector = () => (state: RootState) =>
	state.signUoReducer?.activeForm || initialState.activeForm;
