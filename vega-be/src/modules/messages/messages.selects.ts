export const messagesSelect = {
	uuid: true,
	text: true,
	channelUuid: true,
	isPinned: true,
	updatedAt: true,
	createdAt: true,
	replyToUuid: true,
	isSystem: true,
	author: {
		select: {
			uuid: true,
			name: true,
			secondName: true,
			avatarUrl: true,
		},
	},
	channel: {
		select: {
			chatMemberships: {
				select: {
					userRole: true,
					user: {
						select: {
							uuid: true,
						},
					},
				},
			},
		},
	},
};
