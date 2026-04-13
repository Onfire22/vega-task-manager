import { TChannelDTO } from './channels.types';

export const normalizeChannel = (channel: TChannelDTO) => {
	const { chatMemberships, channelVisibility, channelType, ...rest } = channel;
	return {
		...rest,
		channelType: channelType.toLowerCase(),
		channelVisibility: channelVisibility.toLowerCase(),
		users: chatMemberships.map((item) => {
			return {
				...item.user,
				role: item.userRole,
			};
		}),
	};
};
