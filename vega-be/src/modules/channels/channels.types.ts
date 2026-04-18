import { channelsSelect } from './channels.selects';
import { ChatChannelsGetPayload } from '../../generated/prisma/models/ChatChannels';

export type TChannelType = 'PM' | 'CHANNEL';

export type TChannelVisibility = 'PUBLIC' | 'PRIVATE';

export interface IChannel {
	title: string;
	channelType: TChannelType;
	channelVisibility: TChannelVisibility;
	usersList: Array<string>;
}

export interface IChannelEdit {
	uuid: string;
	title: string;
}

export type TChannelDTO = ChatChannelsGetPayload<{
	select: typeof channelsSelect;
}>;
