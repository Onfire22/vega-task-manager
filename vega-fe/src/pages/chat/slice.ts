import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, IMappedMessage, TNewChatModal } from '@/pages/chat/types.ts';

export const initialState: IInitialState = {
	isUsersControlsOpen: false,
	newChatModal: null,
	activeChannelUuid: null,
	replyMessage: null,
	sidebarSearchValue: '',
};

const chatSlice = createSlice({
	name: '@@name',
	initialState,
	reducers: {
		setIsUsersControlsOpen: (state, action: PayloadAction<boolean>) => {
			state.isUsersControlsOpen = action.payload;
		},
		setNewChatModal: (state, action: PayloadAction<TNewChatModal>) => {
			state.newChatModal = action.payload;
		},
		setActiveChannelUuid: (state, action: PayloadAction<string | null>) => {
			state.activeChannelUuid = action.payload;
		},
		setReplyMessage: (state, action: PayloadAction<IMappedMessage | null>) => {
			state.replyMessage = action.payload;
		},
		setSidebarSearchValue: (state, action: PayloadAction<string>) => {
			state.sidebarSearchValue = action.payload;
		},
	},
});

export const { setIsUsersControlsOpen, setNewChatModal, setActiveChannelUuid, setReplyMessage, setSidebarSearchValue } =
	chatSlice.actions;
export default chatSlice.reducer;
