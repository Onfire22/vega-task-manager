import { Prisma } from '../../generated/prisma/client';
import { messagesSelect } from './messages.selects';

export interface ICreateMessage {
	text: string;
	channelUuid: string;
	authorUuid: string;
	replyToUuid?: string;
	isPinned?: boolean;
	isSystem?: boolean;
}

export interface IEditMessage {
	authorUuid: string;
	channelUuid: string;
	canEdit: boolean;
	messageUuid: string;
	field: 'text' | 'isPinned';
	value: string | boolean;
}

export type TMessage = Prisma.ChatMessagesGetPayload<{
	select: typeof messagesSelect;
}>;
