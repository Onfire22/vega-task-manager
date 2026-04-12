import { Socket } from 'socket.io';
import { channelsService } from './channels.service';
import { IChannel } from './channels.types';
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
