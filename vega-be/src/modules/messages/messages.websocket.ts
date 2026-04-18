import { Socket } from 'socket.io';
import { ICreateMessage } from './messages.types';
import { messagesService } from './messages.service';
import { io } from '../../websocket';

export const createMessage = async (socket: Socket) => {
	try {
		socket.on('message:create', async (messageData: ICreateMessage) => {
			const message = await messagesService.createMessage(messageData);

			io.to(`channel:${messageData.channelUuid}`).emit('message:created', {
				success: true,
				message,
			});
		});
	} catch (e) {
		io.to(`user:${socket.user.id}`).emit('message:error', {
			success: false,
			message: 'Внутренняя ошибка',
		});
	}
};
