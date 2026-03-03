import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';

export const getActiveModalSelector = () => (state: RootState) =>
	state.modalsReducer?.activeModal || initialState.activeModal;
