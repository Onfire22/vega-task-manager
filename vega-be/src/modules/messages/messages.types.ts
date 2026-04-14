export interface ICreateMessage {
	text: string;
	channelUuid: string;
	authorUuid: string;
	replyToUuid?: string;
	isPinned?: boolean;
}
