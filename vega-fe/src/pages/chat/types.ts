export type TChannelType = 'PM' | 'CHANNEL';

export type TChannelVisibility = 'PUBLIC' | 'PRIVATE';

export type TNewChatModal = TChannelType | null;

export interface IChannel {
	id: string;
	title: string;
	channelType: TChannelType;
	channelVisibility: TChannelVisibility;
}

export interface IInitialState {
	isUsersControlsOpen: boolean;
	activeChannelUuid: string | null;
	newChatModal: TNewChatModal;
	channels: Array<IChannel>;
}

export interface IChannelsGroups {
	channel: Array<IChannel>;
	pm: Array<IChannel>;
}
