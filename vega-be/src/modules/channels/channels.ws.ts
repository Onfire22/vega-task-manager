import { Socket } from 'socket.io';
import { IChannel, IChannelEdit } from './channels.types';
import { prismaAppClient } from '../../lib/prisma';
import { io } from '../../websocket';
import { Prisma } from '../../generated/prisma/client';

export const channelsWs = (socket: Socket) => {
	socket.on('channel:join', async (channelUuid: string) => {
		socket.join(`channel:${channelUuid}`);
	});

	socket.on('channel:create', async (channelData: IChannel) => {
		try {
			const channel = await prismaAppClient.chatChannels.create({
				data: channelData,
			});
			socket.join(`channel:${channel.id}`);

			if (channelData.channelVisibility === 'PUBLIC') {
				io.emit('channel:created', { success: true, channel });
			} else {
				io.to(`channel:${channel.id}`).emit('channel:created', { success: true, channel });
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					socket.emit('channel:error', {
						success: false,
						message: 'Имя канала должно быть уникальным',
					});
				}
			} else {
				socket.emit('channel:error', {
					success: false,
					message: 'Внутренняя ошибка',
				});
			}
		}
	});

	socket.on('channel:edit', async (channelData: IChannelEdit) => {
		const channel = await prismaAppClient.chatChannels.update({
			where: { id: channelData.uuid },
			data: { title: channelData.title },
		});
		io.to(`channel:${channel.id}`).emit('channel:edited', channel);
	});

	socket.on('channel:delete', async (channelUuid: string) => {
		const channel = await prismaAppClient.chatChannels.delete({
			where: { id: channelUuid },
		});
		const channels = prismaAppClient.chatChannels.findMany();
		io.to(`channel:${channel.id}`).emit('channel:deleted', channels);
	});

	socket.on('channel:add-user', async (channel: string) => {});
	socket.on('channel:remove-user', async (channel: string) => {});
};
