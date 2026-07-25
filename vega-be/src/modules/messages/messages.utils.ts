import { TMessage } from './messages.types';

export const getNormalizedMessage = (message: TMessage, currentUserUuid: string) => {
	const { channel, updatedAt, ...rest } = message;

	const channelAdminUuid = channel.chatMemberships.find((item) => item.userRole.key === 'chat_admin')?.user.uuid;

	const isCurrentUserAuthor = message.author.uuid === currentUserUuid;

	return {
		...rest,
		canEdit: channelAdminUuid === currentUserUuid || isCurrentUserAuthor,
	};
};
