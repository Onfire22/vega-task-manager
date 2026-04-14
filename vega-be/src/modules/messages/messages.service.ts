import { prismaAppClient } from '../../lib/prisma';
import { ICreateMessage } from './messages.types';
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

export const messagesService = { getMessages, createMessage };
