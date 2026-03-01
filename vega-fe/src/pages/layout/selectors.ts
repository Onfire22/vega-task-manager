import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';

export const getActiveModalShownSelector = () => (state: RootState) =>
	state.layoutReducer?.activeModal || initialState.activeModal;
