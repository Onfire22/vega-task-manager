import { z } from 'zod';

export const ChannelsResponseSchema = z.object({
	channels: z.array(
		z.object({
			channelType: z.enum(['CHANNEL', 'PM']),
			channelVisibility: z.enum(['PUBLIC', 'PRIVATE']),
			id: z.string(),
			title: z.string(),
		}),
	),
});
