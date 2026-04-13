import { z } from 'zod';
import { CreateChannelValidationSchema } from '@/pages/chat/validation.ts';

export type TChannelType = 'pm' | 'channel';

export type TChannelVisibility = 'public' | 'private';

export type TNewChatModal = TChannelType | null;

export interface IChannel {
	id: string;
	title: string;
	channelType: TChannelType;
	channelVisibility: TChannelVisibility;
	users: Array<IUser>;
}

export interface IAvatar {
	initials: string;
	color: string;
}

export interface IMappedUser {
	id: string;
	name: string;
	avatar: IAvatar;
	role: IRole;
}

export type IMappedChannel = Omit<IChannel, 'users'> & {
	users: Array<IMappedUser>;
	channelAvatar?: {
		color: string;
		initials: string;
	};
};

export interface IInitialState {
	isUsersControlsOpen: boolean;
	activeChannel: IMappedChannel | null;
	newChatModal: TNewChatModal;
	channels: Array<IChannel>;
}

export interface IChannelsGroups {
	channel: Array<IMappedChannel>;
	pm: Array<IMappedChannel>;
}

export type TChannelsGroups = Record<TChannelType, Array<IMappedChannel>>;

export interface IUserOption {
	label: string;
	value: string;
}

export interface IRole {
	id: string;
	key: string;
	label: string;
}

export interface IUser {
	id: string;
	name: string;
	secondName: string;
	userName: string;
	role: IRole;
}

export interface IChannelHeaderData {
	membersCount: number;
	channelTitle: string;
	channelVisibility?: string;
}

export type TCreateChannel = z.infer<typeof CreateChannelValidationSchema>;
