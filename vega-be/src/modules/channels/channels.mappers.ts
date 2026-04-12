import { TChannelDTO } from './channels.types';

export const normalizeChannels = (channels: Array<TChannelDTO>) => {
	return channels.map((channel) => {
		const { chatMemberships, ...rest } = channel;
		return {
			...rest,
			users: chatMemberships.map((item) => {
				return {
					...item.user,
					role: item.userRole,
				};
			}),
		};
	});
};
