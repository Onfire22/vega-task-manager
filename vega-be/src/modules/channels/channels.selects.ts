export const channelsSelect = {
	id: true,
	title: true,
	channelType: true,
	channelVisibility: true,
	chatMemberships: {
		select: {
			userRole: {
				select: {
					id: true,
					key: true,
					label: true,
				},
			},
			user: {
				select: {
					id: true,
					userName: true,
					name: true,
					secondName: true,
				},
			},
		},
	},
};
