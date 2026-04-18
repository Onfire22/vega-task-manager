import { z } from 'zod';
import { CreateChannelValidationSchema } from '@/pages/chat/validation.ts';

export type TChannelType = 'pm' | 'channel' | 'channel_join';

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
	activeChannelUuid: string | null;
	newChatModal: TNewChatModal;
	channels: Array<IChannel>;
	messages: Array<IMessage>;
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

export interface IMessage {
	id: string;
	text: string;
	channelUuid: string;
	isPinned: boolean;
	isSystem: boolean;
	createdAt: string;
	updatedAt?: string;
	replyToUuid: string | null;
	author: {
		id: string;
		name: string;
		secondName: string;
	};
}

export type IMappedMessage = Omit<IMessage, 'author'> & {
	author: {
		name: string;
		avatar: IAvatar;
	};
};

export interface IChannelListItem {
	channelAdmin?: {
		id: string;
		name: string;
	};
	channelType: string;
	channelVisibility: string;
	id: string;
	title: string;
	usersLength: number;
}

export type TCreateChannel = z.infer<typeof CreateChannelValidationSchema>;
