import { Socket } from 'socket.io';
import { channelsService } from './channels.service';
import { IChannel, IChannelEdit } from './channels.types';
import { io } from '../../websocket';
import { Prisma } from '../../generated/prisma/client';

export const createChannel = async (socket: Socket) => {
	try {
		socket.on('channel:create', async (channelData: IChannel) => {
			const channel = await channelsService.createChannel(channelData, socket.user.id);

			socket.join(`channel:${channel.id}`);

			if (channelData.channelType === 'CHANNEL') {
				if (channelData.usersList.length > 0) {
					const recipientSockets = await io.in(`user:${channelData.usersList}`).fetchSockets();

					recipientSockets.forEach((s) => s.join(`channel:${channel.id}`));
				}

				if (channelData.channelVisibility === 'PRIVATE') {
					[socket.user.id, ...channelData.usersList].forEach((uuid) =>
						io.to(`user:${uuid}`).emit('channel:created', { success: true, channel }),
					);
				} else {
					io.emit('channel:created', { success: true, channel });
				}
			} else {
				io.to(`user:${socket.user.id}`).emit('channel:created', { success: true, channel });
			}
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
