export interface ICreateMessage {
	text: string;
	channelUuid: string;
	authorUuid: string;
	replyToUuid?: string;
	isPinned?: boolean;
	isSystem?: boolean;
}

export interface IEditMessage {
	messageUuid: string;
	field: 'text' | 'isPinned';
	value: string | boolean;
}
