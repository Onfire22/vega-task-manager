import type { RootState } from '@/store/reducer.ts';
import { initialState } from '@/pages/chat/slice.ts';

export const getIsUsersControlsOpenSelector = () => (state: RootState) =>
	state.chatReducer?.isUsersControlsOpen || initialState.isUsersControlsOpen;

export const getNewChatModalSelector = () => (state: RootState) =>
	state.chatReducer?.newChatModal || initialState.newChatModal;

export const getActiveChannelUuidSelector = () => (state: RootState) =>
	state.chatReducer?.activeChannelUuid || initialState.activeChannelUuid;

export const getReplyMessageSelector = () => (state: RootState) =>
	state.chatReducer?.replyMessage || initialState.replyMessage;
