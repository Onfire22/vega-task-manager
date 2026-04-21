import type { RootState } from '@/store/reducer.ts';
import { initialState } from './slice.ts';

export const getModalTypeSelector = () => (state: RootState) => state.taskSlice?.modalType || initialState.modalType;
