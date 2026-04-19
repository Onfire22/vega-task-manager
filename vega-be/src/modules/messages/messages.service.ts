import { prismaAppClient } from '../../lib/prisma';
import { ICreateMessage, IEditMessage } from './messages.types';
import { messagesSelect } from './messages.selects';
import { getNormalizedMessage } from './messages.utils';

const getMessages = async (channelUuid: string, currentUserUuid: string) => {
	const messages = await prismaAppClient.chatMessages.findMany({
		where: { channelUuid },
		select: messagesSelect,
	});

	return messages.map((item) => getNormalizedMessage(item, currentUserUuid));
};

const createMessage = async (messageData: ICreateMessage, currentUserUuid: string) => {
	const message = await prismaAppClient.chatMessages.create({
		data: messageData,
		select: messagesSelect,
	});

	return getNormalizedMessage(message, currentUserUuid);
};

const editMessage = async (messageData: IEditMessage, currentUserUuid: string) => {
	const message = await prismaAppClient.chatMessages.update({
		where: { id: messageData.messageUuid },
		data: {
			[messageData.field]: messageData.value,
		},
		select: messagesSelect,
	});

	return getNormalizedMessage(message, currentUserUuid);
};

export const messagesService = { getMessages, createMessage, editMessage };
