import { prismaAppClient } from '../../lib/prisma';

const getChannels = () => {
	return prismaAppClient.chatChannels.findMany({
		select: {
			id: true,
			title: true,
			channelType: true,
			channelVisibility: true,
		},
	});
};

export const channelsService = { getChannels };
