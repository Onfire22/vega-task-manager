import { prismaAppClient } from '../../lib/prisma';
import { IChannel, IChannelEdit } from './channels.types';
import { channelsSelect } from './channels.selects';
import { normalizeChannel } from './channels.mappers';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';

const getChannelsByUserUuid = async (userUuid: string) => {
	const channels = await prismaAppClient.chatChannels.findMany({
		where: {
			chatMemberships: {
				some: {
					userUuid,
				},
			},
		},
		select: channelsSelect,
	});

	return channels.map((channel) => normalizeChannel(channel));
};

export const getChannels = async () => {
	const channels = await prismaAppClient.chatChannels.findMany({
		where: {
			channelType: {
				not: 'PM',
			},
		},
		select: channelsSelect,
	});

	return channels.map((channel) => normalizeChannel(channel));
};

const createChannel = (channelData: IChannel, adminUuid: string) => {
	const { usersList, title, ...rest } = channelData;

	const channelTitle = channelData.channelType === 'CHANNEL' ? `#${title}` : title;

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
				title: channelTitle,
				chatMemberships: {
					create: userData,
				},
			},
			select: channelsSelect,
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

const updateChannelUserRole = async (channelUuid: string, userUuid: string) => {
	const userRole = await prismaAppClient.dictionary.findUnique({
		where: { key_type: { type: 'CHAT_ROLE', key: 'chat_member' } },
		select: { id: true },
	});

	if (!userRole) {
		throw new AppError('Роль не найдена', RESPONSE_STATUSES.notFound);
	}

	await prismaAppClient.chatMemberships.upsert({
		where: { user_channel: { channelUuid, userUuid } },
		update: {
			userRoleUuid: userRole.id,
		},
		create: {
			userUuid: userUuid,
			channelUuid: channelUuid,
			userRoleUuid: userRole.id,
		},
	});

	const channel = await prismaAppClient.chatChannels.findUniqueOrThrow({
		where: { id: channelUuid, chatMemberships: { some: { userUuid } } },
		select: channelsSelect,
	});

	return normalizeChannel(channel);
};

export const channelsService = {
	getChannelsByUserUuid,
	getChannels,
	createChannel,
	editChannel,
	deleteChannel,
	updateChannelUserRole,
};
