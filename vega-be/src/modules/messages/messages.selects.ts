export const messagesSelect = {
	id: true,
	text: true,
	channelUuid: true,
	isPinned: true,
	updatedAt: true,
	createdAt: true,
	replyToUuid: true,
	author: {
		select: {
			id: true,
			name: true,
			secondName: true,
		},
	},
};
