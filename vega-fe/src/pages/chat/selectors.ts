import type { RootState } from '@/store/reducer.ts';
import { initialState } from '@/pages/chat/slice.ts';

export const getIsUsersControlsOpenSelector = () => (state: RootState) =>
	state.chatReducer?.isUsersControlsOpen || initialState.isUsersControlsOpen;
