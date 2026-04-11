export type TChannelType = 'PM' | 'CHANNEL';

export type TChannelVisibility = 'PUBLIC' | 'PRIVATE';

export interface IChannel {
	title: string;
	channelType: TChannelType;
	channelVisibility: TChannelVisibility;
}

export interface IChannelEdit {
	uuid: string;
	title: string;
}
