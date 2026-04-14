import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IChannel, IInitialState, IMessage, TNewChatModal } from '@/pages/chat/types.ts';

export const initialState: IInitialState = {
	isUsersControlsOpen: false,
	newChatModal: null,
	channels: [],
	activeChannelUuid: null,
	messages: [],
};

const chatSlice = createSlice({
	name: '@@name',
	initialState,
	reducers: {
		setIsUsersControlsOpen: (state, action: PayloadAction<boolean>) => {
			state.isUsersControlsOpen = action.payload;
		},
		setChannels: (state, action: PayloadAction<Array<IChannel>>) => {
			state.channels = action.payload;
		},
		setNewChatModal: (state, action: PayloadAction<TNewChatModal>) => {
			state.newChatModal = action.payload;
		},
		setActiveChannelUuid: (state, action: PayloadAction<string | null>) => {
			state.activeChannelUuid = action.payload;
		},
		setMessages: (state, action: PayloadAction<Array<IMessage>>) => {
			state.messages = action.payload;
		},
	},
});

export const { setIsUsersControlsOpen, setChannels, setNewChatModal, setActiveChannelUuid, setMessages } =
	chatSlice.actions;
export default chatSlice.reducer;
