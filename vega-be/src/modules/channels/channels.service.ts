import { prismaAppClient } from '../../lib/prisma';
import { IChannel, IChannelEdit } from './channels.types';
import { Socket } from 'socket.io';
import { channelsSelect } from './channels.selects';
import { normalizeChannels } from './channels.mappers';

const getChannels = async () => {
	const channels = await prismaAppClient.chatChannels.findMany({
		select: channelsSelect,
	});

	return normalizeChannels(channels);
};

const createChannel = (channelData: IChannel, adminUuid: string) => {
	const { usersList, ...rest } = channelData;

	return prismaAppClient.$transaction(async (tx) => {
		const userUuids = [...channelData.usersList, adminUuid];

		const dictionaries = await tx.dictionary.findMany({
			where: { type: 'CHAT_ROLE' },
			select: {
				id: true,
				key: true,
				label: true,
			},
		});

		const { chat_admin, chat_member } = dictionaries.reduce(
			(acc, item) => {
				const key = item.key as 'chat_admin' | 'chat_member';
				acc[key] = item.id;
				return acc;
			},
			{} as { chat_admin: string; chat_member: string },
		);

		const userData = userUuids.map((uuid) => {
			return {
				user: { connect: { id: uuid } },
				userRole: {
					connect: {
						id: uuid === adminUuid ? chat_admin : chat_member,
					},
				},
			};
		});

		return tx.chatChannels.create({
			data: {
				...rest,
				chatMemberships: {
					create: userData,
				},
			},
			select: {
				id: true,
				channelType: true,
				channelVisibility: true,
				title: true,
				chatMemberships: {
					select: {
						userUuid: true,
						userRoleUuid: true,
					},
				},
			},
		});
	});
};

const editChannel = (channelData: IChannelEdit) => {
	return prismaAppClient.chatChannels.update({
		where: { id: channelData.uuid },
		data: { title: channelData.title },
	});
};

const deleteChannel = async (channelUuid: string) => {
	await prismaAppClient.chatChannels.delete({
		where: { id: channelUuid },
	});

	return prismaAppClient.chatChannels.findMany();
};

const joinChannel = (socket: Socket) => {
	socket.on('channel:join', async (channelUuid: string) => {
		socket.join(`channel:${channelUuid}`);
	});
};

export const channelsService = { getChannels, createChannel, editChannel, deleteChannel, joinChannel };
