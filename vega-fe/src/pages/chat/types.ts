import { z } from 'zod';
import { CreateChannelValidationSchema } from '@/pages/chat/validation.ts';

export type TChannelType = 'PM' | 'CHANNEL';

export type TChannelVisibility = 'PUBLIC' | 'PRIVATE';

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

export interface IMappedChannel {
	id: string;
	title: string;
	channelType: TChannelType;
	channelVisibility: TChannelVisibility;
	users: Array<IMappedUser>;
}

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

export type TCreateChannel = z.infer<typeof CreateChannelValidationSchema>;
