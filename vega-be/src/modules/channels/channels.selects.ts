export const channelsSelect = {
	uuid: true,
	title: true,
	channelType: true,
	channelVisibility: true,
	chatMemberships: {
		select: {
			userRole: {
				select: {
					uuid: true,
					key: true,
					label: true,
				},
			},
			user: {
				select: {
					uuid: true,
					userName: true,
					name: true,
					secondName: true,
				},
			},
		},
	},
};
