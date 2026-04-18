import { Socket } from 'socket.io';
import { channelsService } from './channels.service';
import { IChannel, IChannelEdit } from './channels.types';
import { io } from '../../websocket';
import { Prisma } from '../../generated/prisma/client';
import { normalizeChannel } from './channels.mappers';
import { messagesService } from '../messages/messages.service';

export const createChannel = async (socket: Socket) => {
	try {
		socket.on('channel:create', async (channelData: IChannel) => {
			const createdChannel = await channelsService.createChannel(channelData, socket.user.id);
			const channel = normalizeChannel(createdChannel);

			socket.join(`channel:${createdChannel.id}`);

			if (channelData.usersList.length > 0) {
				const recipientSockets = await io.in(`user:${channelData.usersList}`).fetchSockets();

				recipientSockets.forEach((s) => s.join(`channel:${createdChannel.id}`));

				if (channelData.channelType === 'CHANNEL') {
					channelData.usersList.forEach((uuid) =>
						io.to(`user:${uuid}`).emit('channel:created', { success: true, channel }),
					);
				}
			}

			io.to(`user:${socket.user.id}`).emit('channel:created', {
				success: true,
				channel,
			});
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				socket.emit('channel:error', {
					success: false,
					message: 'Имя канала должно быть уникальным',
				});
			} else {
				socket.emit('channel:error', {
					success: false,
					message: 'Внутренняя ошибка',
				});
			}
		}
	}
};

export const editChannel = async (socket: Socket) => {
	try {
		socket.on('channel:edit', async (channelData: IChannelEdit) => {
			const channel = await channelsService.editChannel(channelData);

			io.to(`channel:${channel.id}`).emit('channel:edited', { success: true, channelData });
		});
	} catch (e) {
		socket.emit('channel:error', {
			success: false,
			message: 'Внутренняя ошибка',
		});
	}
};

export const joinChannels = (socket: Socket) => {
	socket.on('channel:join', async (channelUuids: string | Array<string>) => {
		const uuids = Array.isArray(channelUuids) ? channelUuids : [channelUuids];

		await Promise.all(uuids.map((uuid) => socket.join(`channel:${uuid}`)));
	});
};

export const joinChannelByUser = async (socket: Socket) => {
	try {
		socket.on('channel:user_join', async (channel: { channelUuid: string }) => {
			const newChannel = await channelsService.updateChannelUserRole(channel.channelUuid, socket.user.id);

			const userData = newChannel?.users.find((user) => user.id === socket.user.id);

			const messageText = `${userData?.name} ${userData?.secondName} присоединился к каналу.`;

			const message = await messagesService.createMessage({
				channelUuid: newChannel.id,
				authorUuid: userData?.id || '',
				text: messageText,
				isSystem: true,
			});

			io.to(`channel:${channel.channelUuid}`).emit('channel:user_joined', { success: true, message });

			io.to(`user:${socket.user.id}`).emit('channel:created', { success: true, channel: newChannel });
		});
	} catch (e) {
		socket.emit('channel:error', {
			success: false,
			message: 'Внутренняя ошибка',
		});
	}
};
