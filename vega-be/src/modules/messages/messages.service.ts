import { prismaAppClient } from '../../lib/prisma';
import { ICreateMessage, IEditMessage } from './messages.types';
import { messagesSelect } from './messages.selects';

const getMessages = (channelUuid: string) => {
	return prismaAppClient.chatMessages.findMany({
		where: { channelUuid },
		select: messagesSelect,
	});
};

const createMessage = (messageData: ICreateMessage) => {
	return prismaAppClient.chatMessages.create({
		data: messageData,
		select: messagesSelect,
	});
};

const editMessage = (messageData: IEditMessage) => {
	return prismaAppClient.chatMessages.update({
		where: { id: messageData.messageUuid },
		data: {
			[messageData.field]: messageData.value,
		},
		select: messagesSelect,
	});
};

export const messagesService = { getMessages, createMessage, editMessage };
