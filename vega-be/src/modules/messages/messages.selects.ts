export const messagesSelect = {
	id: true,
	text: true,
	channelUuid: true,
	isPinned: true,
	updatedAt: true,
	createdAt: true,
	replyToUuid: true,
	isSystem: true,
	author: {
		select: {
			id: true,
			name: true,
			secondName: true,
		},
	},
};
