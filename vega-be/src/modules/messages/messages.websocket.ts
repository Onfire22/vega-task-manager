import { Socket } from 'socket.io';
import { ICreateMessage, IEditMessage } from './messages.types';
import { messagesService } from './messages.service';
import { io } from '../../websocket';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';
import { prismaAppClient } from '../../lib/prisma';
import { PRIVATE_FIELDS } from './messages.constants';

export const createMessage = async (socket: Socket) => {
	try {
		socket.on('message:create', async (messageData: ICreateMessage) => {
			const message = await messagesService.createMessage(messageData, socket.user.id);

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

export const editMessage = (socket: Socket) => {
	try {
		socket.on('message:edit', async (messageData: IEditMessage) => {
			if (PRIVATE_FIELDS.includes(messageData.field) && !messageData.canEdit) {
				throw new AppError(
					'У вас недостаточно прав для выполнения этой операции',
					RESPONSE_STATUSES.notAllowed,
				);
			}

			const message = await messagesService.editMessage(messageData, socket.user.id);

			io.to(`channel:${message.channelUuid}`).emit('message:edited', {
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
